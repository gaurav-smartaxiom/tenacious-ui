import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationTimesPipe, NotificationTimesStampPipe } from './notification-time.pipe';

const components = [
  NotificationTimesPipe,
  NotificationTimesStampPipe
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ]
})
export class PipesModule { }
