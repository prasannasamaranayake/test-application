import {Attempts} from "./attempts.model";

export class Activity {
  id: number;
  content: string;
  attempts: Attempts;
  student: string;
  time: string;
  skill: string;
  type: string;
}
