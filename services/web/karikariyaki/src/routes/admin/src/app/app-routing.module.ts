import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
//import { HomeViewComponent } from './views';

const routes: Routes = [];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
