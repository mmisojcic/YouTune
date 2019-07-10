import { Component, OnInit } from '@angular/core';
import { domFaderAnimation } from '../../shared/animations/dom-fader.animation';

@Component({
  selector: 'yt-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [domFaderAnimation]
})
export class WelcomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
