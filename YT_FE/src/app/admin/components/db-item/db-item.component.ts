import { SpinnerService } from '../../../shared/services/spinner.service';
import { GenreService } from './../../services/genre.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DbItem } from '../../models/db-item.model';
import { Genre } from 'src/app/models/genre.model';
import { DbItemsService } from '../../services/db-items.service';
import { ngIfAnimation } from 'src/app/shared/animations/ngIf-fader.animation';

@Component({
  selector: 'yt-db-item',
  templateUrl: './db-item.component.html',
  styleUrls: ['./db-item.component.scss'],
  animations: [ngIfAnimation]
})
export class DbItemComponent implements OnInit {
  @Input() index: number;
  @Input() dbItem: DbItem<Genre>;
  @Input() checked;
  // @Input() checkboxShow = false;

  constructor(private dbItemsService: DbItemsService) {}

  ngOnInit() {}

  onEdit() {
    this.dbItemsService.genreEmitter.next(this.dbItem.item);
  }

  onDelete() {
    this.dbItemsService.genreIdEmitter.next(this.dbItem.item.genreId);
  }

  onCheck() {
    if (!this.checked) {
      this.dbItemsService.textarr.push(this.dbItem.item);
    } else {
      this.dbItemsService.textarr = this.dbItemsService.textarr.filter(t => {
        return t !== this.dbItem.item;
      });
    }

    console.log(this.dbItemsService.textarr);
  }
}
