import { Injectable } from '@angular/core';
import {Class} from "../models/class.model";
import {Activity} from "../models/activity.model";
import {FlatActivity} from "../models/ui/flat-activity.model";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class CommonHelperService {

  constructor() { }

  /**
   * Map a single flat activity
   * @param cls
   * @param studAct
   * @private
   */
  public createFlatActivity(cls: Class, studAct: Activity): FlatActivity{
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
}
