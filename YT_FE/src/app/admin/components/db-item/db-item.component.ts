import { SpinnerService } from '../../../shared/services/spinner.service';
import { GenreService } from './../../services/genre.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DbItem } from '../../models/db-item.model';
import { Genre } from 'src/app/models/genre.model';
import { DbItemsService } from '../../services/db-items.service';

@Component({
  selector: 'yt-db-item',
  templateUrl: './db-item.component.html',
  styleUrls: ['./db-item.component.scss']
})
export class DbItemComponent implements OnInit {
  @Input() index: DbItem<Genre>;
  @Input() dbItem: DbItem<Genre>;

  constructor(private dbItemsService: DbItemsService) {}

  ngOnInit() {}

  onEdit() {
    this.dbItemsService.genreEmitter.next(this.dbItem.item);
  }

  onDelete() {
    this.dbItemsService.genreIdEmitter.next(this.dbItem.item.genreId);
  }
}
