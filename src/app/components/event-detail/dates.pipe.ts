import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'datesPipe'})
export class DatesPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value).map(key => value[key]);
  }
}