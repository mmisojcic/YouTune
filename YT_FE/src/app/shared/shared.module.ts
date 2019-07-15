import { NgModule } from '@angular/core';
import { SpinnerToggleDirective } from '../shared/directives/spinner-toggle.directive';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { SecondsFormatPipe } from './pipes/seconds-format.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [SpinnerToggleDirective, HeaderComponent, SecondsFormatPipe],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  exports: [
    MaterialModule,
    SpinnerToggleDirective,
    HeaderComponent,
    SecondsFormatPipe,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ]
})
export class SharedModule {}
