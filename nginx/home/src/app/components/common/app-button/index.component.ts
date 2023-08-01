import { Component, Input } from '@angular/core';

type ClickEvent = (event?: MouseEvent) => void;

@Component({
    selector: 'app-button',
    templateUrl: './index.component.html',
    styleUrls: ['../../../../assets/styles/components/common/_app-button.scss'],
})
export class AppButtonComponent {
    @Input()
    public onClick?: ClickEvent;

    public onButtonClick(event: MouseEvent): void {
        if (this.onClick) {
            this.onClick(event);
        }
    }
}
