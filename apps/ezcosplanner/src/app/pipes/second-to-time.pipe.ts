import { Pipe, PipeTransform } from '@angular/core';

/**
 * convert second to time format HHh mmmin sss 
 */
@Pipe({
  name: 'time',
  standalone: true,
})
export class SecondToTimePipe implements PipeTransform {
  transform(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    const hourString = hours > 0 ? `${hours}h` : '';
    const minuteString = minutes > 0 ? `${minutes}min` : '';
    const secondString = remainingSeconds > 0 ? `${remainingSeconds}s` : '';

    return `${hourString} ${minuteString} ${secondString}`;
  }
}
