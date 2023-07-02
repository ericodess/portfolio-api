import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { EndpointComponent } from './index.component';

@NgModule({
	declarations: [EndpointComponent],
	imports: [CommonModule],
	exports: [EndpointComponent],
})
export class EndpointModule {}
