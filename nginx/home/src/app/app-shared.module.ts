import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    exports: [],
})
export class SharedModule {}
