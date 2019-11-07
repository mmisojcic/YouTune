import { Song } from './../../models/song.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DbItem, Action } from '../models/db-item.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { SongDTO } from '../../DTOs/song.dto';
import { SongConverter } from '../../converters/song.converter';
import { ApiURLGeneratorService } from '../../shared/services/api-URL-generator.service';
@Injectable({
  providedIn: 'root'
})
export class SongService {
  songConverter: SongConverter = new SongConverter();

  constructor(
    private http: HttpClient,
    private apiURLGenerator: ApiURLGeneratorService
  ) {}

  // get all songs
  getSongs(): Observable<DbItem<Song>[]> {
    const URL = this.apiURLGenerator.generateURL('getSongs');

    return this.http.get(URL).pipe(
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
    const URL = this.apiURLGenerator.generateURL('saveSong');
    const DTO = this.songConverter.modelToDTO(model);

    console.log(DTO, '.....OVDE.....');
    return this.http.post(URL, DTO).pipe(
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
    const URL = this.apiURLGenerator.generateURL('updateSong', model.songId);
    const DTO = this.songConverter.modelToDTO(model);

    return this.http.put(URL, DTO).pipe(
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
    const URL = this.apiURLGenerator.generateURL('deleteSong', id);

    return this.http.delete(URL).pipe(
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
    const URL = this.apiURLGenerator.generateURL('listDeleteSongs');
    const DTO = this.songConverter.modelToDTOList(songs);

    return this.http.post(URL + '/deleteList', DTO).pipe(
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
