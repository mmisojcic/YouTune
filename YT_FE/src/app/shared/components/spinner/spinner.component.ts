import { Component, OnInit, Input } from '@angular/core';
import { domFaderAnimation } from '../../animations/dom-fader.animation';
import { ngIfAnimation } from '../../animations/ngIf-fader.animation';

@Component({
  selector: 'yt-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  animations: [domFaderAnimation, ngIfAnimation]
})
export class SpinnerComponent implements OnInit {
  @Input() spin: boolean;

  constructor() {}

  ngOnInit() {}
}
