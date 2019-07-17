import {
  trigger,
  transition,
  style,
  animate,
  state
} from '@angular/animations';

export const test = trigger('test', [
  transition(':enter', [
    style({ opacity: '0' }),
    animate('1000ms ease-out', style({ opacity: '1' }))
  ]),
  transition(':leave', [animate('1000ms ease-out', style({ opacity: '0' }))]),
  state('*', style({ opacity: '0' }))
]);
