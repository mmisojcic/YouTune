import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  spinnerShow = false;
  trigger: Subject<boolean> = new Subject();

  constructor() {}

  spinnerToogle() {
    // set value opposite of current value
    this.spinnerShow === false
      ? (this.spinnerShow = true)
      : (this.spinnerShow = false);

    // emit value using subject
    this.trigger.next(this.spinnerShow);
  }
}
