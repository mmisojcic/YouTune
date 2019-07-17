import { Component, OnInit, Input } from '@angular/core';
import { domFaderAnimation } from '../../animations/dom-fader.animation';
import { test } from '../../animations/test.animation';

@Component({
  selector: 'yt-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  animations: [domFaderAnimation, test]
})
export class SpinnerComponent implements OnInit {
  @Input() spin: boolean;

  constructor() {}

  ngOnInit() {}
}
