import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PanelComponent } from './components/panel/panel.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [PanelComponent],
  imports: [CommonModule, AdminRoutingModule, MaterialModule]
})
export class AdminModule {}
