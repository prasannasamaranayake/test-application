import {Component, OnInit, ViewChild} from '@angular/core';
import {ReportsService} from "../../core/services/reports.service";
import {Class} from "../../core/models/class.model";
import {Activity} from "../../core/models/activity.model";
import {forkJoin} from "rxjs";
import {take} from "rxjs/operators";
import * as moment from 'moment';
import {TableView} from "../../core/models/ui/table-view.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  public readonly columns = ['completedDate', 'content','type', 'skill', 'average', 'time'];

  public classes: Class[] = [];
  public activities: Activity[] = [];
  public students: string[] = [];
  public flatActivities: FlatActivity[] = [];
  public tableView: TableView<FlatActivity> = new TableView(this.columns);

  constructor(private reportsService: ReportsService) {
  }

  ngOnInit(): void {

    forkJoin([this.reportsService.getClassData(), this.reportsService.getActivities()]).pipe(take(1))
      .subscribe(results => {
        this.classes = results[0];
        this.activities = results[1];
        const duplicatedStudents = [...this.classes.map(cls => [...cls.students])];
        this.students = [...new Set( this.activities.map(obj => obj.student)) ];// Extract unique students from Activities
        this.flattenActivities();
        this.createTable();
      });
  }

  private flattenActivities(){
    this.classes.forEach( cls => {
      cls.students.forEach( stud => {
        this.activities.filter( act => stud === act.student).forEach( studAct => {
          this.flatActivities.push(this.createFlatActivity(cls, studAct))
        });
      })
    })
    console.log(this.flatActivities);
  }

  private createFlatActivity(cls: Class, studAct: Activity): FlatActivity{
    const flatActivity = new FlatActivity();
    flatActivity.classId = cls.id;
    flatActivity.className = cls.name;
    flatActivity.student = studAct.student;
    flatActivity.activityId = studAct.id;
    flatActivity.content = studAct.content;
    flatActivity.type = studAct.type;
    flatActivity.skill = studAct.skill;
    flatActivity.time = studAct.time;
    // get max date from weeks
    flatActivity.completedDate = moment.max(studAct.attempts.weeks.map(d => moment(d, 'DD/MM/YY', true))).format('DD/MM/YY');
    // get average of values
    flatActivity.average = studAct.attempts.values.reduce((a,b) => a + b, 0) / studAct.attempts.values.length;

    return flatActivity;
  }

  private createTable(){
    this.tableView.dataSource = new MatTableDataSource<FlatActivity>(this.flatActivities);
    setTimeout(() => {
      // Timeout needs otherwise sort is not initialized in dom
      this.tableView.dataSource.sort = this.sort;
    }, 0);
  }

}

export class FlatActivity{
  classId: number;
  className: string;
  student: string;
  activityId: number;
  content: string;
  type: string;
  skill: string;
  time: string;
  completedDate: string;
  average: number

  constructor() {
    this.classId = -1;
    this.className = '';
    this.student = '';
    this.activityId = -1;
    this.content = '';
    this.type = '';
    this.skill = '';
    this.time = '';
    this.completedDate = '';
    this.average = -1;
  }
}
