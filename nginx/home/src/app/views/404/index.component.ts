import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-not-found-view',
    templateUrl: './index.component.html',
})
export class NotFoundViewComponent implements OnInit {
    public route!: string;

    constructor(private _route: ActivatedRoute) {}

    ngOnInit(): void {
        this._route.url.subscribe({
            next: (url) => {
                this.route = url.join('/');
            },
        });
    }
}
