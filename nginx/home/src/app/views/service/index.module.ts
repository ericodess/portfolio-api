import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ServiceViewComponent } from './index.component';

// Modules
import { EndpointModule, NavbarModule } from 'src/app/components';

@NgModule({
	declarations: [ServiceViewComponent],
	imports: [CommonModule, EndpointModule, NavbarModule],
	providers: [],
})
export class ServiceViewModule {}
