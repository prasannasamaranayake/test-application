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
  isEmptyActivity: boolean // To identify if manually added activity to show missing data

  constructor(isEmptyActivity = false) {
    this.isEmptyActivity = isEmptyActivity;
  }
}
