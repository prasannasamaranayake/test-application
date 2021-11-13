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
import {FormBuilder, FormGroup} from "@angular/forms";

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
  public filterForm: FormGroup = new FormGroup({});

  constructor(private reportsService: ReportsService, private formBuilder: FormBuilder) {
    this.initFilterForm();
  }

  ngOnInit(): void {

    forkJoin([this.reportsService.getClassData(), this.reportsService.getActivities()]).pipe(take(1))
      .subscribe(results => {
        this.classes = results[0];
        this.activities = results[1];
        this.students = this.getUniqueStudents();
        this.flattenActivities();
        this.createTable();
      });

    this.filterForm.valueChanges.subscribe( values => {
      if(values){
        const filterCriteria = new FilterCriteria(values.classId, values.student, values.dateFRom, values.dateTo);
        this.filterDataSource(filterCriteria);
      }
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

  private initFilterForm(){
    this.filterForm = this.formBuilder.group({
      classId: [''],
      student: [''],
      dateFrom: [''],
      dateTo: [''],
    });
  }

  private createTable(){
    this.tableView.dataSource = new MatTableDataSource<FlatActivity>(this.flatActivities);
    this.tableView.dataSource.sort = this.sort;
  }

  private filterDataSource(filterCriteria: FilterCriteria){
    const filteredData = this.flatActivities.filter( data => this.filterData(data, filterCriteria));
    this.tableView.dataSource = new MatTableDataSource<FlatActivity>(filteredData);
  }

  private filterData(activity: FlatActivity, filterCriteria: FilterCriteria): boolean{
    const classMatched = !filterCriteria.classId || activity.classId === filterCriteria.classId;
    const studentMatched = !filterCriteria.student || activity.student === filterCriteria.student;
    const dateFromMatched = !filterCriteria.dateFrom || moment(activity.completedDate, 'DD/MM/YY', true) >= moment(filterCriteria.dateFrom);
    const dateToMatched = !filterCriteria.dateTo || moment(activity.completedDate, 'DD/MM/YY', true) <= moment(filterCriteria.dateTo);

    return classMatched && studentMatched && dateFromMatched && dateToMatched;
  }

  /**
   * Extract uniques students from classes array
   * @private
   */
  private getUniqueStudents(): string[]{
    const duplicatedStudentsArr = this.classes.map(cls => cls.students);
    const uniqueStudents = [...new Set( duplicatedStudentsArr.reduce((a, b) => a.concat(b), []) ) ];
    // Sorting by last name
    return uniqueStudents.sort((a, b) => a.split(' ')[1]?.localeCompare(b.split(' ')[1]));
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
}

export class FilterCriteria{
  classId: number;
  student: string;
  dateFrom: string;
  dateTo: string;

  constructor(classId: number, student: string, dateFrom: string, dateTo: string) {
    this.classId = classId;
    this.student = student;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }
}
