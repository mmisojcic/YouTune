import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerToggleDirective } from '../shared/directives/spinner-toggle.directive';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [SpinnerToggleDirective, HeaderComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, SpinnerToggleDirective, HeaderComponent]
})
export class SharedModule {}
