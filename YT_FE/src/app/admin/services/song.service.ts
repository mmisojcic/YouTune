import { Song } from './../../models/song.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as server from '../../shared/config/api.config';
import { DbItem, Action } from '../models/db-item.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { SongDTO } from 'src/app/DTOs/song.dto';
import { SongConverter } from 'src/app/converters/song.converter';
@Injectable({
  providedIn: 'root'
})
export class SongService {
  url = server.api.fullUrl(server.api.songs.base);
  songConverter: SongConverter = new SongConverter();

  constructor(private http: HttpClient) {}

  // get all songs
  getSongs(): Observable<DbItem<Song>[]> {
    return this.http.get(this.url).pipe(
      map((res: SongDTO[]) => {
        return this.mapList(res);
      }),
      catchError(err => {
        console.log('ERROR:::', err);
        return throwError(err.statusText);
      }),
      finalize(() => {
        // hide spinner
        console.log('ALL SONGS LOADED:::');
      })
    );
  }

  saveSong(model: Song): Observable<DbItem<Song>[]> {
    const dto = this.songConverter.modelToDTO(model);
    return this.http.post(this.url, dto).pipe(
      map((res: SongDTO[]) => {
        return this.mapList(res);
      }),
      catchError(err => {
        console.log('ERROR: ', err);
        return throwError(err.statusText);
      }),
      finalize(() => {
        console.log('SONG SAVED:::');
      })
    );
  }

  updateSong(model: Song): Observable<DbItem<Song>[]> {
    const dto = this.songConverter.modelToDTO(model);
    return this.http.put(this.url + '/' + model.songId, dto).pipe(
      map((res: SongDTO[]) => {
        return this.mapList(res);
      }),
      catchError(err => {
        console.log('ERROR: ', err);
        return throwError(err.statusText);
      }),
      finalize(() => {
        console.log('SONG UPDATED:::');
      })
    );
  }

  deleteSong(id: number) {
    return this.http.delete(this.url + '/' + id).pipe(
      map((res: SongDTO[]) => {
        return this.mapList(res);
      }),
      catchError(err => {
        console.log('ERROR: ', err);
        return throwError(err.statusText);
      }),
      finalize(() => {
        console.log('SONG DELETED:::');
      })
    );
  }

  deleteSongs(songs: Song[]) {
    const dto = this.songConverter.modelToDTOList(songs);

    return this.http.post(this.url + '/deleteList', dto).pipe(
      map((res: SongDTO[]) => {
        return this.mapList(res);
      }),
      catchError(err => {
        console.log('ERROR: ', err);
        return throwError(err.statusText);
      }),
      finalize(() => {
        console.log('SONGS DELETED:::');
      })
    );
  }

  mapList(res: SongDTO[]) {
    const songs = this.songConverter.DTOtoModelList(res);
    const dbItems: DbItem<Song>[] = [];
    songs.forEach(s => {
      dbItems.push(new DbItem(s.title, Action.NONE, s));
    });
    return dbItems;
  }
}
