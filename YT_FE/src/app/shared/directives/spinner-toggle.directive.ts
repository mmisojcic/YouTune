import { Subscription } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';
import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  OnDestroy,
  OnInit,
  Input,
  ElementRef,
  HostBinding,
  OnChanges
} from '@angular/core';
import { NgIfContext } from '@angular/common';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ytSpinnerToggle]'
})
export class SpinnerToggleDirective implements OnInit, OnChanges, OnDestroy {
  @Input('ytSpinnerToggle') show: boolean;
  spinnerTriggerSub: Subscription;

  // templateRef is the template (translates to <ng-template></ng-template> and wraps the view element) that directive works with
  // viewContainer points to the container where template is rendered.
  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<NgIfContext>,
    private spinnerService: SpinnerService
  ) {}

  // accepts boolean argument
  ytSpinnerToggle(show: boolean) {
    if (show) {
      // creates the view
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // clears the view
      this.viewContainer.clear();
    }
  }

  ngOnInit(): void {
    // subscribe to spinner service trigger and awaits value
    this.spinnerTriggerSub = this.spinnerService.trigger.subscribe(res => {
      this.ytSpinnerToggle(res);
    });
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    // this.ytSpinnerToggle(this.show);
  }

  ngOnDestroy(): void {
    // avoid memory leaks, unsubscribe when element and directive is removed from the DOM
    this.spinnerTriggerSub.unsubscribe();
  }
}
