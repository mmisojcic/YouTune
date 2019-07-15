import { DbItem } from './../../models/db-item.model';
import { Component, OnInit, Input } from '@angular/core';
import { Genre } from 'src/app/models/genre.model';
import { domFaderAnimation } from 'src/app/shared/animations/dom-fader.animation';

@Component({
  selector: 'yt-db-items-list',
  templateUrl: './db-items-list.component.html',
  styleUrls: ['./db-items-list.component.scss'],
  animations: [domFaderAnimation]
})
export class DbItemsListComponent implements OnInit {
  @Input() title: string;
  @Input() dbItems: DbItem<Genre>[] = [];

  constructor() {}

  ngOnInit() {}
}
