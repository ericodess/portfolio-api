import { NgModule } from '@angular/core';

// Components
import { HomeViewComponent } from './index.component';

// Modules
import { AppButtonModule, CodeBlockModule, SeparatorBlockModule } from 'src/app/components';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [HomeViewComponent],
	imports: [AppButtonModule, CodeBlockModule, SeparatorBlockModule, CommonModule],
	providers: [],
})
export class HomeViewModule {}
