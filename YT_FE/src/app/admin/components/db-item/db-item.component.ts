import { SpinnerService } from '../../../shared/services/spinner.service';
import { GenreService } from './../../services/genre.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DbItem } from '../../models/db-item.model';
import { Genre } from 'src/app/models/genre.model';
import { DbItemsService } from '../../services/db-items.service';
import { ngIfAnimation } from 'src/app/shared/animations/ngIf-fader.animation';
import { Song } from 'src/app/models/song.model';

@Component({
  selector: 'yt-db-item',
  templateUrl: './db-item.component.html',
  styleUrls: ['./db-item.component.scss'],
  animations: [ngIfAnimation]
})
export class DbItemComponent implements OnInit {
  @Input() index: number;
  @Input() dbItem: DbItem<Genre | Song>;
  @Input() checked;
  // @Input() checkboxShow = false;

  constructor(private dbItemsService: DbItemsService) {}

  ngOnInit() {}

  onEdit() {
    console.log(this.dbItem.item instanceof Genre);
    this.dbItemsService.genreEmitter.next(this.dbItem.item);
  }

  onDelete() {
    // this.dbItemsService.genreIdEmitter.next(this.dbItem.item.genreId);
  }

  onCheck() {
    if (!this.checked) {
      this.dbItemsService.genres.push(this.dbItem.item);
    } else {
      this.dbItemsService.genres = this.dbItemsService.genres.filter(t => {
        return t !== this.dbItem.item;
      });
    }

    console.log(this.dbItemsService.genres);
  }
}
