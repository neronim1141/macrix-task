import { Pipe, PipeTransform } from '@angular/core';
import { calculateAge } from '../utils/calculate-age';

@Pipe({
  name: 'calculateAge',
})
export class CalculateAgePipe implements PipeTransform {
  transform(value: Date): unknown {
    return calculateAge(value);
  }
}
