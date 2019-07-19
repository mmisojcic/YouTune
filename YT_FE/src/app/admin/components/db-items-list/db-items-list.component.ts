import { DbItem } from './../../models/db-item.model';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Genre } from 'src/app/models/genre.model';
import { domFaderAnimation } from 'src/app/shared/animations/dom-fader.animation';
import { ngIfAnimation } from 'src/app/shared/animations/ngIf-fader.animation';
import { DbItemsService } from '../../services/db-items.service';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'yt-db-items-list',
  templateUrl: './db-items-list.component.html',
  styleUrls: ['./db-items-list.component.scss'],
  animations: [domFaderAnimation, ngIfAnimation]
})
export class DbItemsListComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() dbItemsCached: DbItem<Genre>[] = [];
  dbItems: DbItem<Genre | Login>[] = [];
  @ViewChild('filter') filter: ElementRef<HTMLInputElement>;
  checked = false;

  constructor(private dbItemsService: DbItemsService) {}

  ngOnInit() {}

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.dbItems = this.dbItemsCached;
    this.filter.nativeElement.value = '';
  }

  onSearch(e: HTMLInputElement) {
    const inputRegExp = new RegExp(e.value.toLowerCase());
    const tmpDbItems: DbItem<Genre>[] = [];

    this.dbItemsCached.forEach(dbItem => {
      if (inputRegExp.test(dbItem.title.toLowerCase())) {
        tmpDbItems.push(dbItem);
      }
    });

    this.dbItems = tmpDbItems;
    console.log(this.checked);
  }

  onCheck() {
    this.dbItemsService.markedDbItems = [];
    if (!this.checked) {
      this.dbItems.forEach(dbi => {
        this.dbItemsService.markedDbItems.push(dbi);
      });
    }
    console.log(this.dbItemsService.markedDbItems);
  }

  onDelete() {
    this.dbItemsService.emitDbItems();
    this.checked = false;
  }
}
