import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerToggleDirective } from '../shared/directives/spinner-toggle.directive';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { SecondsFormatPipe } from './pipes/seconds-format.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SpinnerToggleDirective, HeaderComponent, SecondsFormatPipe],
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  exports: [
    MaterialModule,
    SpinnerToggleDirective,
    HeaderComponent,
    SecondsFormatPipe,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class SharedModule {}
