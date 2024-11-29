import { Pipe, PipeTransform } from '@angular/core';
import { getDuration } from '../utilites/get-time-duration.util';

@Pipe({ name: 'notificationTimes' })
export class NotificationTimesPipe implements PipeTransform {
  transform(value: Date): string {
    return getDuration(Math.floor(new Date(value).getTime() / 1000));
  }
}

@Pipe({ name: 'notificationTimesStamp' })
export class NotificationTimesStampPipe implements PipeTransform {
  transform(value: number): string {
    return getDuration(value);
  }
}
