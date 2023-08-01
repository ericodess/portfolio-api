import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Endpoint, Parameter, VariantEndpoint } from 'pepefolio';

// Types
import { ApiSource } from 'src/app/types';

// Services
import { StringService } from 'src/app/services';

@Component({
    selector: 'app-endpoint',
    templateUrl: './index.component.html',
})
export class EndpointComponent implements OnInit {
    @Input()
    public source!: ApiSource;
    @Input()
    public endpoint!: Endpoint;
    @Input()
    public parentEndpoint: Endpoint | undefined;

    /**
     * Primitives
     */
    public isTesterVisible = false;
    public canFetch = false;
    public responseCode = '';

    /**
     * In House
     */
    public selectedVariant: VariantEndpoint | undefined;

    /**
     * Forms
     */
    public searchForm: FormGroup = new FormGroup({});
    public queryForm: FormGroup = new FormGroup({});
    public bodyForm: FormGroup = new FormGroup({});

    constructor(private _stringService: StringService) {}

    ngOnInit(): void {
        if (!this.endpoint.variants || this.endpoint.variants.length === 0) {
            return;
        }

        this.endpoint.variants.forEach((variant) => {
            if (!variant.parameters) {
                return;
            }

            this._setupForm(variant);
        });

        this.onVariantClick(this.endpoint.variants[0]);
    }

    public getPath() {
        const rasterizedRootPath = `${this._stringService.removeLeadingAndTrailingSlashes(
            this.source.rootPath,
        )}/api/v${this.endpoint.version}`;
        const rasterizedEndpointPath = this._stringService.removeLeadingAndTrailingSlashes(
            this.endpoint.path,
        );

        if (!this.parentEndpoint) {
            if (rasterizedEndpointPath) {
                return `/${rasterizedRootPath}/${rasterizedEndpointPath}`;
            }

            return `/${rasterizedRootPath}`;
        }

        const rasterizedParentEndpointPath = this._stringService.removeLeadingAndTrailingSlashes(
            this.parentEndpoint.path,
        );

        let path = `/${rasterizedRootPath}`;

        if (rasterizedParentEndpointPath) {
            path = path.concat(`/${rasterizedParentEndpointPath}`);
        }

        if (rasterizedEndpointPath) {
            path = path.concat(`/${rasterizedEndpointPath}`);
        }

        return path;
    }

    public isVariantActive(variant: VariantEndpoint) {
        if (!this.selectedVariant) {
            return false;
        }

        return this.selectedVariant.method === variant.method;
    }

    public canRenderSearchForm() {
        if (!this.selectedVariant) {
            return false;
        }

        return (
            this.selectedVariant.parameters?.search &&
            this.selectedVariant.parameters.search.length > 0
        );
    }

    public canRenderQueryForm() {
        if (!this.selectedVariant) {
            return false;
        }

        return (
            this.selectedVariant.parameters?.query &&
            this.selectedVariant.parameters.query.length > 0
        );
    }

    public canRenderBodyForm() {
        if (!this.selectedVariant) {
            return false;
        }

        return (
            this.selectedVariant.parameters?.body && this.selectedVariant.parameters.body.length > 0
        );
    }

    public getInputType(type: string): string {
        switch (type) {
            case 'number':
                return 'number';
            case 'boolean':
                return 'checkbox';
            default:
                return 'text';
        }
    }

    public getBooleanParameters(parameters: Parameter[] | undefined): Parameter[] {
        if (!parameters) {
            return [];
        }

        return parameters.filter((parameter) => parameter.type === 'boolean');
    }

    public isSearchFormInvalid() {
        if (!this.selectedVariant) {
            return false;
        }

        return this.searchForm.invalid || this.searchForm.disabled;
    }

    public isQueryFormInvalid() {
        if (!this.selectedVariant) {
            return false;
        }

        return this.queryForm.invalid || this.queryForm.disabled;
    }

    public isBodyFormInvalid() {
        if (!this.selectedVariant) {
            return false;
        }

        return this.bodyForm.invalid || this.bodyForm.disabled;
    }

    public onHeaderClick() {
        this.isTesterVisible = !this.isTesterVisible;

        this._onCleanUp();
    }

    public onVariantClick(variant: VariantEndpoint) {
        if (this.selectedVariant && this.isVariantActive(variant)) {
            return;
        }

        this.selectedVariant = variant;
        this.canFetch = this.selectedVariant.method === 'GET';

        this._refreshSearchForm();
        this._refreshQueryForm();
        this._refreshBodyForm();
    }

    public onSubmitClick() {
        if (
            !this.selectedVariant ||
            this.canFetch === false ||
            this.isSearchFormInvalid() ||
            this.isQueryFormInvalid() ||
            this.isBodyFormInvalid()
        ) {
            return;
        }

        const url = new URL(
            `${this.source.isSecure ? 'https' : 'http'}://${this.source.rootUrl}${this.getPath()}`,
        );

        const parameters = this.selectedVariant.parameters;

        if (parameters?.search) {
            parameters.search.forEach((parameter) => {
                const parameterValue =
                    this.searchForm.controls[parameter.label].value ?? parameter.defaultValue;

                if (!parameterValue) {
                    return;
                }

                url.pathname = url.pathname.concat(
                    `/${this.searchForm.controls[parameter.label].value ?? parameter.defaultValue}`,
                );
            });
        }

        if (parameters?.query) {
            parameters.query.forEach((parameter) => {
                const parameterValue =
                    this.queryForm.controls[parameter.label].value ?? parameter.defaultValue;

                if (!parameterValue) {
                    return;
                }

                url.searchParams.append(parameter.label, parameterValue);
            });
        }

        let body: any = {};

        if (parameters?.body) {
            parameters.body.forEach((parameter) => {
                const parameterValue =
                    this.bodyForm.controls[parameter.label].value ?? parameter.defaultValue;

                if (!parameterValue) {
                    return;
                }

                body[parameter.label] = parameterValue;
            });
        }

        fetch(url.href, {
            body: parameters?.body ? body : undefined,
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.responseCode = '\n' + JSON.stringify(data, this._truncateBase64Strings, '   ');
            })
            .catch((error) => {
                this.responseCode =
                    '\n' + JSON.stringify({ wasSuccess: false, error: error.message }, null, '   ');
            });
    }

    private _setupForm(targetEndpoint: VariantEndpoint) {
        if (!targetEndpoint.parameters) {
            return;
        }

        if (targetEndpoint.parameters.search) {
            targetEndpoint.parameters.search.forEach((parameter) => {
                this.searchForm.addControl(
                    parameter.label,
                    new FormControl(
                        parameter.defaultValue ?? '',
                        parameter.type === 'number' ? [Validators.min(0)] : [],
                    ),
                );
            });
        }

        if (targetEndpoint.parameters.query) {
            targetEndpoint.parameters.query.forEach((parameter) => {
                this.queryForm.addControl(
                    parameter.label,
                    new FormControl(
                        parameter.defaultValue ?? '',
                        parameter.type === 'number' ? [Validators.min(0)] : [],
                    ),
                );
            });
        }

        if (targetEndpoint.parameters.body) {
            targetEndpoint.parameters.body.forEach((parameter) => {
                this.bodyForm.addControl(
                    parameter.label,
                    new FormControl(
                        parameter.defaultValue ?? '',
                        parameter.type === 'number' ? [Validators.min(0)] : [],
                    ),
                );
            });
        }
    }

    private _refreshSearchForm() {
        if (this.canFetch) {
            this.searchForm.enable();

            return;
        }

        this.searchForm.disable();
    }

    private _refreshQueryForm() {
        if (this.canFetch) {
            this.queryForm.enable();

            return;
        }

        this.queryForm.disable();
    }

    private _refreshBodyForm() {
        if (this.canFetch) {
            this.bodyForm.enable();

            return;
        }

        this.bodyForm.disable();
    }

    private _truncateBase64Strings(key: string, value: any) {
        if (
            key.toLocaleLowerCase().includes('image') ||
            key.toLocaleLowerCase().includes('markdown')
        ) {
            return value.substring(0, 25) + '...';
        }

        return value;
    }

    private _onCleanUp() {
        this.responseCode = '';
    }
}
