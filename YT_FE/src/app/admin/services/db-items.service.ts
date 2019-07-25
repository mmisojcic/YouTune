import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Genre } from 'src/app/models/genre.model';
import { DbItem } from '../models/db-item.model';
import { Song } from 'src/app/models/song.model';
import { Artist } from 'src/app/models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class DbItemsService {
  dbItemEmitter: Subject<DbItem<Genre | Artist>> = new Subject();
  dbItemsEmitter: Subject<DbItem<Genre | Artist>[]> = new Subject();

  markedDbItems: Array<DbItem<Genre | Artist>> = new Array();

  deleteButtonEmitter: Subject<boolean> = new Subject();

  IS_GENRES;
  IS_ARTIST;
  IS_SONG;

  constructor() {}

  emitDbItems() {
    this.dbItemsEmitter.next(this.markedDbItems);
  }

  checkItemType() {
    this.IS_GENRES = this.markedDbItems[0].item instanceof Genre;
    this.IS_ARTIST = this.markedDbItems[0].item instanceof Artist;
    this.IS_SONG = this.markedDbItems[0].item instanceof Song;
  }

  dbItemsToModelList<T>(markedDbItems: DbItem<T>[]): T[] {
    const modelList: T[] = [];

    markedDbItems.forEach(dbItem => {
      modelList.push(dbItem.item);
    });

    return modelList;
  }
}
