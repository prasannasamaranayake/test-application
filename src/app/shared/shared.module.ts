import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    ChartComponent
  ],
    exports: [
        ChartComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ]
})
export class SharedModule {
}
