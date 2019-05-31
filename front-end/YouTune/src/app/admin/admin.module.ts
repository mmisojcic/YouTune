import { HeaderComponent } from './../shared/components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PanelComponent } from './components/panel/panel.component';

@NgModule({
  declarations: [PanelComponent, HeaderComponent],
  imports: [CommonModule, AdminRoutingModule]
})
export class AdminModule {}
