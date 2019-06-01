import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  spinning = false;
  trigger: Subject<boolean> = new Subject();

  constructor() {}

  // shows spinner component
  spinnerShow() {
    if (!this.spinning) {
      // emit value using subject
      this.trigger.next(true);
      this.spinning = true;
    }
  }

  // hides spinner component
  spinnerHide() {
    // emit value using subject
    this.trigger.next(false);
    this.spinning = false;
  }
}
