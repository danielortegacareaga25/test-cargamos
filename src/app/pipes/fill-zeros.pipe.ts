import { Pipe, PipeTransform } from '@angular/core';
import { addZeros } from '../helpers/converters.helper';

@Pipe({
  name: 'fillZeros'
})
export class FillZerosPipe implements PipeTransform {

  transform(value: unknown, _: unknown[]): unknown {
    return value ? addZeros(value) : '00';
  }

}
