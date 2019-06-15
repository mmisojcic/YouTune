import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerToggleDirective } from '../shared/directives/spinner-toggle.directive';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { SecondsFormatPipe } from './pipes/seconds-format.pipe';

@NgModule({
  declarations: [SpinnerToggleDirective, HeaderComponent, SecondsFormatPipe],
  imports: [CommonModule, MaterialModule],
  exports: [
    MaterialModule,
    SpinnerToggleDirective,
    HeaderComponent,
    SecondsFormatPipe
  ]
})
export class SharedModule {}
