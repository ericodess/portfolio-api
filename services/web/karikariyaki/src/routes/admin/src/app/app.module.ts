import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './app-shared.module';

@NgModule({
	declarations: [AppComponent],
	imports: [AppRoutingModule, BrowserModule, SharedModule],
	providers: [RouterModule],
	bootstrap: [AppComponent],
})
export class AppModule {}
