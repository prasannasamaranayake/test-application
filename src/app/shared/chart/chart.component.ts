import {Component, Input, OnInit} from '@angular/core';
import {ChartView} from "../../core/models/ui/chart-view.model";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() public chartView: ChartView = new ChartView();

  constructor() { }

  ngOnInit(): void {
  }

}
