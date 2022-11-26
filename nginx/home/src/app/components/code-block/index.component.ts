import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import * as Prism from 'prismjs';

@Component({
	selector: 'app-code-block',
	templateUrl: './index.component.html',
	styleUrls: ['../../../assets/styles/components/_code-block.scss'],
})
export class CodeBlockComponent implements AfterViewInit, OnChanges {
	@ViewChild('codeBlock')
	public codeElement!: ElementRef;

	@Input()
	public code?: string;

	@Input()
	public language: 'javascript' | 'json' = 'javascript';

	public ngAfterViewInit() {
		Prism.highlightElement(this.codeElement.nativeElement);
	}

	public ngOnChanges(changes: any): void {
		if (changes?.code) {
			if (this.codeElement?.nativeElement) {
				this.codeElement.nativeElement.textContent = this.code;

				Prism.highlightElement(this.codeElement.nativeElement);
			}
		}
	}
}
