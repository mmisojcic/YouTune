import { Component } from '@angular/core';
import { domFaderAnimation } from './shared/animations/dom-fader.animation';

@Component({
  selector: 'yt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [domFaderAnimation]
})
export class AppComponent {
  title = 'YouTune';
}
