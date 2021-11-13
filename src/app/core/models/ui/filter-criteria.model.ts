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
