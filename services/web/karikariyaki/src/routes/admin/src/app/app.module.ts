import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './app-shared.module';

// Services
import { ApiService } from '@services';

@NgModule({
	declarations: [AppComponent],
	imports: [AppRoutingModule, BrowserModule, HttpClientModule, SharedModule],
	providers: [ApiService, RouterModule],
	bootstrap: [AppComponent],
})
export class AppModule {}
