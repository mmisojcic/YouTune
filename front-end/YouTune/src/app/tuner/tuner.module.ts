import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TunerRoutingModule } from './tuner-routing.module';
import { TunerComponent } from './components/tuner/tuner.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TunerComponent],
  imports: [CommonModule, TunerRoutingModule, SharedModule]
})
export class TunerModule {}
