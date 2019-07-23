import { Component, OnInit, Input } from '@angular/core';
import { ngIfAnimation } from '../../animations/ngIf-fader.animation';

@Component({
  selector: 'yt-alphabetical-sort',
  templateUrl: './alphabetical-sort.component.html',
  styleUrls: ['./alphabetical-sort.component.scss'],
  animations: [ngIfAnimation]
})
export class AlphabeticalSortComponent implements OnInit {
  @Input() sort = 'desc';

  constructor() {}

  ngOnInit() {}
}
