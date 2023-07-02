import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ServiceViewComponent } from './views';

const routes: Routes = [
	{
		path: ':rootPath',
		pathMatch: 'full',
		component: ServiceViewComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
