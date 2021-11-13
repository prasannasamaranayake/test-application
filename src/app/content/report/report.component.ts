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
import {ChartView} from "../../core/models/ui/chart-view.model";
import {FlatActivity} from "../../core/models/ui/flat-activity.model";
import {FilterCriteria} from "../../core/models/ui/filter-criteria.model";
import {CommonHelperService} from "../../core/utils/common-helper.service";

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

  constructor(private reportsService: ReportsService, private formBuilder: FormBuilder, private commonHelper: CommonHelperService) {
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

  public get chartView(): ChartView{
    const excellentCount = this.tableView.dataSource.data.filter( data => data.average >= 90).length;
    const goodCount = this.tableView.dataSource.data.filter( data => data.average >= 80 && data.average < 90).length;
    const okCount = this.tableView.dataSource.data.filter( data => data.average >= 60 && data.average < 80).length;
    const weekCount = this.tableView.dataSource.data.filter( data => data.average < 60).length;
    const unassignedCount = 20;
    return new ChartView()
    // return new ChartView(excellentCount, goodCount, okCount, weekCount, unassignedCount)
  }

  public get headerText(): string{
    const df = this.filterForm.get('dateFrom')?.value;
    const dt = this.filterForm.get('dateTo')?.value;
    const formattedDf = df ? moment(df).format('DD MMM YYYY') : '';
    const formattedDt = dt ? moment(dt).format('DD MMM YYYY'): '';
    return formattedDf && formattedDt ? `Overall results for the period: ${formattedDf} - ${formattedDt}` : 'Overall results';
  }

  /**
   * Create Flatten Objects of Activities
   * @private
   */
  private flattenActivities(){
    this.classes.forEach( cls => {
      cls.students.forEach( stud => {
        this.activities.filter( act => stud === act.student).forEach( studAct => {
          this.flatActivities.push(this.commonHelper.createFlatActivity(cls, studAct))
        });
      })
    })
    console.log(this.flatActivities);
  }

  /**
   * Init filter form
   * @private
   */
  private initFilterForm(){
    this.filterForm = this.formBuilder.group({
      classId: [''],
      student: [''],
      dateFrom: [''],
      dateTo: [''],
    });
  }

  /**
   * Init mat table
   * @private
   */
  private createTable(){
    this.tableView.dataSource = new MatTableDataSource<FlatActivity>(this.flatActivities);
    this.tableView.dataSource.sort = this.sort;
  }

  /**
   * Set Filtered data for table data source
   * @param filterCriteria
   * @private
   */
  private filterDataSource(filterCriteria: FilterCriteria){
    const filteredData = this.flatActivities.filter( data => this.filterData(data, filterCriteria));
    this.tableView.dataSource = new MatTableDataSource<FlatActivity>(filteredData);
  }

  /**
   * Filter out data upon criteria
   * @param activity
   * @param filterCriteria
   * @private
   */
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
