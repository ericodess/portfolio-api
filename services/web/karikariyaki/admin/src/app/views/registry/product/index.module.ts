import { NgModule } from '@angular/core';

import { RegistryProductViewComponent } from './index.component';

// Modules
import { TableModule } from '@components';

@NgModule({
	declarations: [RegistryProductViewComponent],
	imports: [TableModule],
	exports: [RegistryProductViewComponent],
})
export class RegistryProductViewModule {}
