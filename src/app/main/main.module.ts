import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {ReportComponent} from './report/report.component';
import {HttpClientModule} from "@angular/common/http";
import {ReportsService} from "../core/services/reports.service";


@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  providers: [
    ReportsService
  ]
})
export class MainModule { }
