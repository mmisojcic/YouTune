import { Component, OnInit, Input } from '@angular/core';
import { DbItem } from '../../models/db-item.model';
import { Genre } from 'src/app/models/genre.model';

@Component({
  selector: 'yt-db-item',
  templateUrl: './db-item.component.html',
  styleUrls: ['./db-item.component.scss']
})
export class DbItemComponent implements OnInit {
  @Input() dbItem: DbItem<Genre>;
  constructor() {}

  ngOnInit() {}
}
