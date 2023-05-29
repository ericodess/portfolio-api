import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { HomeViewComponent } from './index.component';

// Modules
import { AppButtonModule, CodeBlockModule, SeparatorBlockModule } from 'src/app/components';

@NgModule({
	declarations: [HomeViewComponent],
	imports: [AppButtonModule, CodeBlockModule, CommonModule, SeparatorBlockModule],
	providers: [],
})
export class HomeViewModule {}
