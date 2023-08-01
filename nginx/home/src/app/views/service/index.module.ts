import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ServiceViewComponent } from './index.component';

// Modules
import { EndpointModule, NavbarModule } from 'src/app/components';
import { ContentLoaderModule } from '@ngneat/content-loader';

@NgModule({
    declarations: [ServiceViewComponent],
    imports: [CommonModule, ContentLoaderModule, EndpointModule, NavbarModule],
    providers: [],
})
export class ServiceViewModule {}
