import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ServiceViewComponent, HomeViewComponent } from './views';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: HomeViewComponent,
	},
	{
		path: 'service/:rootPath',
		pathMatch: 'full',
		component: ServiceViewComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
