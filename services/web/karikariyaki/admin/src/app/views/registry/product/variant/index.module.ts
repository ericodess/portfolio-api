import { NgModule } from '@angular/core';

import { RegistryProductVariantViewComponent } from './index.component';

// Modules
import { TableModule } from '@components';

@NgModule({
	declarations: [RegistryProductVariantViewComponent],
	imports: [TableModule],
	exports: [RegistryProductVariantViewComponent],
})
export class RegistryProductVariantViewModule {}
