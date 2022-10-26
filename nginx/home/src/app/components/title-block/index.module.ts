import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { SeparatorBlockComponent } from './index.component';

@NgModule({
	declarations: [SeparatorBlockComponent],
	imports: [CommonModule],
	exports: [SeparatorBlockComponent],
})
export class SeparatorBlockModule {}
