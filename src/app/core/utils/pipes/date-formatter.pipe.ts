import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {

  transform(date: string, format?: string): unknown {
    return moment(date, 'DD/MM/YY', true).format('DD MMM YYYY');
  }

}
