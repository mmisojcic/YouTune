import { ConfirmDialogComponent } from './../../../shared/components/confirm-dialog/confirm-dialog.component';
import { DbItem } from './../../models/db-item.model';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ViewChild,
  ElementRef,
  Inject
} from '@angular/core';
import { Genre } from 'src/app/models/genre.model';
import { domFaderAnimation } from 'src/app/shared/animations/dom-fader.animation';
import { ngIfAnimation } from 'src/app/shared/animations/ngIf-fader.animation';
import { DbItemsService } from '../../services/db-items.service';
import { Login } from 'src/app/models/login.model';
import { Subscription } from 'rxjs';
import { Song } from 'src/app/models/song.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'yt-db-items-list',
  templateUrl: './db-items-list.component.html',
  styleUrls: ['./db-items-list.component.scss'],
  animations: [domFaderAnimation, ngIfAnimation]
})
export class DbItemsListComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() dbItemsCached: DbItem<Genre | Song>[] = [];
  dbItems: DbItem<Genre | Login>[] = [];
  @ViewChild('filter') filter: ElementRef<HTMLInputElement>;
  checked = false;
  deleteButtonSubscription: Subscription;
  showDeleteButton = false;
  sort = 'asc';

  constructor(
    private dbItemsService: DbItemsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.deleteButtonSubscription = this.dbItemsService.deleteButtonEmitter.subscribe(
      data => {
        this.showDeleteButton = data;
      }
    );
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.dbItems = this.dbItemsCached;
    this.filter.nativeElement.value = '';
    this.checked = false;
    this.showDeleteButton = false;
    this.dbItemsService.markedDbItems = [];
    this.sort = 'asc';
  }

  onSearch(e: HTMLInputElement) {
    const inputRegExp = new RegExp(e.value.toLowerCase());
    const tmpDbItems: DbItem<Genre | Login>[] = [];

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
    if (this.checked) {
      this.dbItems.forEach(dbi => {
        this.dbItemsService.markedDbItems.push(dbi);
      });
    }
    this.showDeleteButton = this.checked;
    console.log(this.dbItemsService.markedDbItems);
  }

  onDelete() {
    this.dbItemsService.emitDbItems();
    this.checked = false;
    this.showDeleteButton = false;
    // this.onCheck();
  }

  sortAsc() {
    this.dbItems = this.dbItems.sort((itemA, itemB) => {
      if (itemA.title > itemB.title) {
        return 1;
      } else if (itemA.title < itemB.title) {
        return -1;
      }

      return 0;
    });
    this.sort = 'desc';
  }
  sortDesc() {
    this.dbItems = this.dbItems.sort((itemA, itemB) => {
      if (itemA.title < itemB.title) {
        return 1;
      } else if (itemA.title > itemB.title) {
        return -1;
      }

      return 0;
    });
    this.sort = 'asc';
  }

  onSort() {
    if (this.sort === 'asc') {
      this.sortAsc();
    } else if (this.sort === 'desc') {
      this.sortDesc();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: 'sranje'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
