import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsFormat'
})
export class SecondsFormatPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const minutes = Math.floor(value / 60);
    const seconds = value - minutes * 60;

    let formatedDuration: string;

    if (seconds < 10) {
      formatedDuration = minutes + ':' + '0' + seconds;
    } else {
      formatedDuration = minutes + ':' + seconds;
    }

    return formatedDuration;
  }
}
