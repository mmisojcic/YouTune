import { Component } from '@angular/core';
import { routingAnimation } from './shared/animations/router.animation';

@Component({
  selector: 'yt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routingAnimation]
})
export class AppComponent {
  title = 'YouTune';
}
