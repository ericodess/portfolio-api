import { NgModule } from '@angular/core';

// Components
import { NavbarComponent } from './index.component';

// Modules
import { AvatarModule } from '@components';

// Imports
import { FormsBundle, MaterialBundle } from '@imports';

@NgModule({
	declarations: [NavbarComponent],
	imports: [AvatarModule, FormsBundle, MaterialBundle],
	exports: [NavbarComponent],
})
export class NavbarModule {}
