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

@Component({
  selector: 'yt-db-items-list',
  templateUrl: './db-items-list.component.html',
  styleUrls: ['./db-items-list.component.scss'],
  animations: [domFaderAnimation, ngIfAnimation]
})
export class DbItemsListComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() dbItemsCached: DbItem<Genre>[] = [];
  dbItems: DbItem<Genre>[] = [];
  @ViewChild('filter') filter: ElementRef<HTMLInputElement>;
  spin = false;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.dbItems = this.dbItemsCached;
    this.filter.nativeElement.value = '';
  }

  onSearch(e: HTMLInputElement) {
    this.spin = true;
    const inputRegExp = new RegExp(e.value.toLowerCase());
    const tmpDbItems: DbItem<Genre>[] = [];

    this.dbItemsCached.forEach(dbItem => {
      if (inputRegExp.test(dbItem.title.toLowerCase())) {
        tmpDbItems.push(dbItem);
      }
    });

    this.dbItems = tmpDbItems;
  }
}
