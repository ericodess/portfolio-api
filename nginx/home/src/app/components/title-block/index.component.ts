import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-separator-block',
    templateUrl: './index.component.html',
    styleUrls: ['../../../assets/styles/components/_separator-block.scss'],
})
export class SeparatorBlockComponent {
    @Input()
    public title: string = '';
    @Input()
    public titleType?: 'primary' | 'secondary' | 'mono-primary' | 'mono-secondary' = 'primary';
    @Input()
    public titleBackgroundColor?: string = 'white';
    @Input()
    public hasTitleBorders?: boolean = true;
    @Input()
    public hasBorders?: boolean = true;
    @Input()
    public isHoverReactive?: boolean = false;
}
