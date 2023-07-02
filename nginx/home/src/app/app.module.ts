import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';

// Services
import { AppRouterService, HighlightService } from './services';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './app-shared.module';

// Components
import { NavbarModule } from './components';

@NgModule({
	declarations: [AppComponent],
	imports: [AppRoutingModule, BrowserModule, NavbarModule, SharedModule],
	providers: [AppRouterService, HighlightService, RouterModule],
	bootstrap: [AppComponent],
})
export class AppModule {}
