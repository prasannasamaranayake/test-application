import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../core/services/api.service";
import {ReportsService} from "../../core/services/reports.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private reportsService: ReportsService) {
  }

  ngOnInit(): void {
    this.reportsService.getClassData().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      });

    this.reportsService.getActivities().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

}
