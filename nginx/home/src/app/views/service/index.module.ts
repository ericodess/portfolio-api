import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ServiceViewComponent } from './index.component';

// Modules
import {
	AppButtonModule,
	CodeBlockModule,
	NavbarModule,
	SeparatorBlockModule,
} from 'src/app/components';

@NgModule({
	declarations: [ServiceViewComponent],
	imports: [CommonModule, NavbarModule],
	providers: [],
})
export class ServiceViewModule {}
