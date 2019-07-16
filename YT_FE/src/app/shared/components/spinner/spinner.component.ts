import { Component, OnInit } from '@angular/core';
import { domFaderAnimation } from '../../animations/dom-fader.animation';

@Component({
  selector: 'yt-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  animations: [domFaderAnimation]
})
export class SpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
