export class ChartView{
  excellent: number;
  good: number;
  ok: number;
  week: number;
  unassigned: number;

  constructor(excellent = 20, good = 20, ok = 20, week = 20, unassigned = 20) {
    this.excellent = excellent;
    this.good = good;
    this.ok = ok;
    this.week = week;
    this.unassigned = unassigned;
  }
}
