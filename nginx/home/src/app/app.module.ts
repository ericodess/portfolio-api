import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    imports: [AppRoutingModule, BrowserAnimationsModule, BrowserModule, NavbarModule, SharedModule],
    providers: [AppRouterService, HighlightService, RouterModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
