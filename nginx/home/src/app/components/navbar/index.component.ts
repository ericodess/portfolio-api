import { Component } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

// Types
import { ApiSource, ValidApiSources } from 'src/app/types';

// Services
import { StringService } from 'src/app/services';

@Component({
    selector: 'app-navbar',
    templateUrl: './index.component.html',
})
export class NavbarComponent {
    /**
     * Consts
     */
    public readonly NAVBAR_LOGGED_NAVBAR_TRESHOLD = 50;

    /**
     * Primitives
     */
    public isNavbarActive = false;

    /**
     * In House
     */
    public availableSources: ApiSource[] = [];
    public currentApiSource: ApiSource | undefined;

    private _touchOrigin: Touch | null = null;

    constructor(private _router: Router, private _stringService: StringService) {}

    ngOnInit(): void {
        ValidApiSources.forEach((source) => {
            const url = new URL(
                `${source.isSecure ? 'https' : 'http'}://${source.rootUrl}/${
                    source.rootPath
                }/api/specs`,
            );

            const timerStart = new Date();

            this.availableSources.push(source);

            fetch(url.href)
                .then((raw) => raw.json())
                .then(() => {
                    const timerEnd = new Date();

                    const sourceIndex = this.availableSources.findIndex(
                        (target) => source.name === target.name,
                    );

                    this.availableSources[sourceIndex].responseTimeInMs = Math.abs(
                        timerEnd.getMilliseconds() - timerStart.getMilliseconds(),
                    );

                    this._refreshAvailableSources();
                })
                .catch(() => {
                    const sourceIndex = this.availableSources.findIndex(
                        (target) => source.name === target.name,
                    );

                    this.availableSources[sourceIndex].responseTimeInMs = -1;

                    this._refreshAvailableSources();
                });
        });

        this._setupScapeMovements();
        this._setupCurrentEndpoint();
    }

    public isServiceActive(rootPath: string) {
        if (!this.currentApiSource) {
            return false;
        }

        return this.currentApiSource.rootPath.toUpperCase() === rootPath.toUpperCase();
    }

    public isServiceLive(latency: number) {
        return latency > -1;
    }

    public onHamburguerClick() {
        this.isNavbarActive = !this.isNavbarActive;
    }

    public onLogoTitle() {
        this._router.navigate(['']).then(() => {
            this.onHamburguerClick();
        });
    }

    public onServiceClick(targetService: ApiSource) {
        if (
            this.isServiceActive(targetService.rootPath) ||
            this.isServiceLive(targetService.responseTimeInMs) === false
        ) {
            return;
        }

        this._router
            .navigateByUrl(
                `/service/${this._stringService.removeLeadingAndTrailingSlashes(
                    targetService.rootPath,
                )}`,
            )
            .then(() => {
                this.onHamburguerClick();
            });
    }

    private _doesHeritageContainClassname(classList: string[], element: HTMLElement): boolean {
        let didFindOnElement = false;

        classList.forEach((className) => {
            if (element.className?.includes && element.className?.includes(className)) {
                didFindOnElement = true;

                return;
            }
        });

        if (didFindOnElement) {
            return true;
        }

        if (!element.parentElement) {
            return false;
        }

        return this._doesHeritageContainClassname(classList, element.parentElement);
    }

    private _refreshAvailableSources() {
        this.availableSources = this.availableSources.sort(this._sortByLiveStatus);
    }

    private _setupScapeMovements() {
        window.addEventListener('touchstart', (event) => {
            this._touchOrigin = event.touches[0];
        });

        window.addEventListener('touchend', (event) => {
            if (this.isNavbarActive === false) {
                return;
            }

            const location = event.changedTouches[0];

            if (!location) {
                return;
            }

            const targetComponent = window.document.elementFromPoint(
                location.clientX,
                location.clientY,
            ) as HTMLElement;

            if (!targetComponent) {
                return;
            }

            if (this._doesHeritageContainClassname(['navbar'], targetComponent) === false) {
                this.isNavbarActive = false;
            }
        });

        window.addEventListener('touchmove', (event) => {
            if (!this._touchOrigin || this.isNavbarActive === false) {
                return;
            }

            const latestTouch = event.touches[0];

            const xUp = latestTouch.clientX;
            const yUp = latestTouch.clientY;

            const xDiff = this._touchOrigin.clientX - xUp;
            const yDiff = this._touchOrigin.clientY - yUp;

            if (Math.abs(xDiff) < Math.abs(yDiff)) {
                return;
            }

            if (xDiff > this.NAVBAR_LOGGED_NAVBAR_TRESHOLD) {
                this.isNavbarActive = false;

                this._touchOrigin = null;
            }
        });
    }

    private _setupCurrentEndpoint() {
        this._router.events.subscribe({
            next: (event) => {
                const changeEvent = event as RouterEvent;

                if (!changeEvent.url) {
                    return;
                }

                const splittedURL = changeEvent.url.split('/');
                const currentPath = splittedURL[splittedURL.length - 1].toUpperCase();

                this.currentApiSource = this.availableSources.find(
                    (endpoint) => endpoint.rootPath.toUpperCase() === currentPath,
                );
            },
        });
    }

    private _sortByLiveStatus(a: ApiSource, b: ApiSource): number {
        if (a.responseTimeInMs > 0 && b.responseTimeInMs > 0) {
            return a.name.localeCompare(b.name);
        }

        if (a.responseTimeInMs > 0 && b.responseTimeInMs < 0) {
            return -1;
        }

        if (a.responseTimeInMs < 0 && b.responseTimeInMs > 0) {
            return 1;
        }

        return 0;
    }
}
