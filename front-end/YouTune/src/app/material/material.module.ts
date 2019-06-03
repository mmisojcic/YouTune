import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatCardModule,
  MatRippleModule
} from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatRippleModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatRippleModule
  ]
})
export class MaterialModule {}
