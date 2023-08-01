import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { LatencyMeterComponent } from './index.component';

@NgModule({
    declarations: [LatencyMeterComponent],
    imports: [CommonModule],
    exports: [LatencyMeterComponent],
})
export class LatencyMeterModule {}
