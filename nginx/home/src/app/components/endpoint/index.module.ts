import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { EndpointComponent } from './index.component';
import { CodeBlockModule } from '../code-block/index.module';

// Imports
import { FormsBundle, MaterialBundle } from 'src/app/imports';

@NgModule({
	declarations: [EndpointComponent],
	imports: [CodeBlockModule, CommonModule, FormsBundle, MaterialBundle],
	exports: [EndpointComponent],
})
export class EndpointModule {}
