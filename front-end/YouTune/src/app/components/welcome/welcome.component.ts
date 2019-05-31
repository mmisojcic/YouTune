import { Component, OnInit } from '@angular/core';
import { routingAnimation } from '../../shared/animations/router.animation';

@Component({
  selector: 'yt-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [routingAnimation]
})
export class WelcomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
