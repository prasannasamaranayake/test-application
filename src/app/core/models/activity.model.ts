import {Attempts} from "./attempts.model";

export class Activity {
  id: number;
  content: string;
  attempts: Attempts;
  student: string;
  time: string;
  skill: string;
  type: string;

  constructor() {
    this.id = -1;
    this.content = '';
    this.attempts = new Attempts();
    this.student = '';
    this.time = '';
    this.skill = '';
    this.type = '';
  }
}
