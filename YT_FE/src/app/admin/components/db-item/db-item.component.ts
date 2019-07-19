import { Action } from './../../models/db-item.model';
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

  constructor(private dbItemsService: DbItemsService) {}

  ngOnInit() {}

  onEdit() {
    this.dbItem.action = Action.EDIT;
    this.dbItemsService.dbItemEmitter.next(this.dbItem);
  }

  onDelete() {
    this.dbItem.action = Action.DELETE;
    this.onCheck();
    this.dbItemsService.dbItemEmitter.next(this.dbItem);
  }

  onCheck() {
    if (!this.checked) {
      this.dbItemsService.markedDbItems.push(this.dbItem);
    } else {
      this.dbItemsService.markedDbItems = this.dbItemsService.markedDbItems.filter(
        dbi => {
          return dbi !== this.dbItem;
        }
      );
    }

    console.log(this.dbItemsService.markedDbItems);
  }
}
