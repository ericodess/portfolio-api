import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeViewComponent, NotFoundViewComponent, ServiceViewComponent } from './views';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: HomeViewComponent,
	},
	{
		path: ':rootPath',
		pathMatch: 'full',
		component: ServiceViewComponent,
	},
	{
		path: '404/:path',
		component: NotFoundViewComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
