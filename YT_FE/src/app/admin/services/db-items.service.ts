import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Genre } from 'src/app/models/genre.model';
import { DbItem } from '../models/db-item.model';

@Injectable({
  providedIn: 'root'
})
export class DbItemsService {
  genreEmitter: Subject<Genre> = new Subject<Genre>();
  genreIdEmitter: Subject<number> = new Subject<number>();
  dbItemsEmitter: Subject<DbItem<Genre>[]> = new Subject<DbItem<Genre>[]>();

  textarr: Genre[] = [];
  constructor() {}
}
