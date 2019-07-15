import { DbItem } from './../../models/db-item.model';
import { Component, OnInit, Input } from '@angular/core';
import { Genre } from 'src/app/models/genre.model';

@Component({
  selector: 'yt-db-items-list',
  templateUrl: './db-items-list.component.html',
  styleUrls: ['./db-items-list.component.scss']
})
export class DbItemsListComponent implements OnInit {
  @Input() dbItems: DbItem<Genre>[] = [];

  constructor() {}

  ngOnInit() {}
}
