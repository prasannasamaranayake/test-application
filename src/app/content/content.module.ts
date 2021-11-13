import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContentRoutingModule} from './content-routing.module';
import {ReportComponent} from './report/report.component';
import {ReportsService} from "../core/services/reports.service";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {PipesModule} from "../core/utils/pipes/pipes.module";


@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    PipesModule
  ],
  providers: [
    ReportsService,
    MatNativeDateModule
  ]
})
export class ContentModule { }
