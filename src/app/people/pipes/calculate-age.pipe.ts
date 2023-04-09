import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  standalone: true,
  name: 'calculateAge',
})
export class CalculateAgePipe implements PipeTransform {
  transform(value: Date): number {
    const today = moment();
    const birthDate = moment(value);
    return today.diff(birthDate, 'year');
  }
}
