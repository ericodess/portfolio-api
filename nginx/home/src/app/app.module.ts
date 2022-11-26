import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// Components
import { AppComponent } from './app.component';

// Services
import { AppRouterService, HighlightService } from './services';

// Modules
import { HomeViewModule } from './views';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './app-shared.module';

@NgModule({
	declarations: [AppComponent],
	imports: [AppRoutingModule, BrowserModule, HomeViewModule, SharedModule],
	providers: [AppRouterService, HighlightService, RouterModule],
	bootstrap: [AppComponent],
})
export class AppModule {}
