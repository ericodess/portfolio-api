import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Views
import { HomeViewComponent, RegistryViewComponent } from '@views';

const routes: Routes = [
	{
		path: '',
		component: HomeViewComponent,
	},
	{
		path: 'registry',
		component: RegistryViewComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
