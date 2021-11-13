import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Class} from "../models/class.model";
import {ApiService} from "./api.service";
import {Activity} from "../models/activity.model";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable()
export class ReportsService {

  constructor(private apiService: ApiService) {}

  public getClassData(): Observable<Class[]>{
    return this.apiService.getData<Class>(environment.classesEndpoint);
  }

  public getActivities(): Observable<Activity[]>{
    return this.apiService.get<Activity>(environment.activityEndpoint).pipe(
      map( activities => JSON.parse(activities.toString())) // Need to parse since it returns a string instead of array
    );
  }
}
