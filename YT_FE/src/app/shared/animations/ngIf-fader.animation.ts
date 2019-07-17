import {
  trigger,
  transition,
  style,
  animate,
  state
} from '@angular/animations';

export const ngIfAnimation = trigger('ngIfFade', [
  transition(':enter', [
    style({ opacity: '0' }),
    animate('300ms ease-out', style({ opacity: '1' }))
  ]),
  transition(':leave', [
    style({ opacity: '1' }),
    animate('300ms ease-out', style({ opacity: '0' }))
  ]),
  state('*', style({ opacity: '1' }))
]);
