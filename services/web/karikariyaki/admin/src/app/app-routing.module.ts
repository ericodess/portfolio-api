import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Views
import {
	HomeViewComponent,
	RegistryProductViewComponent,
	RegistryProductVariantViewComponent,
} from '@views';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: HomeViewComponent,
	},
	{
		path: 'registry/product',
		component: RegistryProductViewComponent,
	},
	{
		path: 'registry/product/variant',
		component: RegistryProductVariantViewComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
