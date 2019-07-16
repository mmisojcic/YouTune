import { NgModule } from '@angular/core';
import { SpinnerToggleDirective } from '../shared/directives/spinner-toggle.directive';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { SecondsFormatPipe } from './pipes/seconds-format.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
@NgModule({
  declarations: [
    SpinnerToggleDirective,
    HeaderComponent,
    SecondsFormatPipe,
    SpinnerComponent
  ],
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
    HttpClientModule,
    SpinnerComponent
  ]
})
export class SharedModule {}
