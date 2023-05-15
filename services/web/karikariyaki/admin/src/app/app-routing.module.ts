import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Views
import {
	HomeViewComponent,
	RegistryMenuViewComponent,
	RegistryOperatorViewComponent,
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
		path: 'registry/menu',
		pathMatch: 'full',
		component: RegistryMenuViewComponent,
	},
	{
		path: 'registry/operator',
		pathMatch: 'full',
		component: RegistryOperatorViewComponent,
	},
	{
		path: 'registry/product',
		pathMatch: 'full',
		component: RegistryProductViewComponent,
	},
	{
		path: 'registry/product/variant',
		pathMatch: 'full',
		component: RegistryProductVariantViewComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
