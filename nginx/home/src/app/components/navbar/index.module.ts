import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

// Components
import { NavbarComponent } from './index.component';
import { AppButtonModule } from '../common/app-button/index.module';

@NgModule({
	declarations: [NavbarComponent],
	imports: [AppButtonModule, CommonModule, MatIconModule],
	exports: [NavbarComponent],
})
export class NavbarModule {}
