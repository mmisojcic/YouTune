import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { SongConverter } from '../../converters/song.converter';
import { SongDTO } from '../../DTOs/song.dto';
import { ApiURLGeneratorService } from '../../shared/services/api-URL-generator.service';
import { Action, DbItem } from '../models/db-item.model';
import { Song } from './../../models/song.model';
import { QueryParamConfig } from './../../shared/services/api-URL-generator.service';
@Injectable({
    providedIn: 'root'
})
export class SongService {
    songConverter: SongConverter = new SongConverter();

    // TEST
    queryParams: QueryParamConfig[] = [
        { name: 'PARAM_1', value: 'j0Mz_lsrserf34' },
        { name: 'PARAM_2', value: 'j0Mz_lsrserf34' },
        { name: 'PARAM_3', value: 'j0Mz_lsrserf34' },
        { name: 'PARAM_4', value: 'j0Mz_lsrserf34' }
    ];

    constructor(
        private http: HttpClient,
        private apiURLGenerator: ApiURLGeneratorService
    ) { }

    // get all songs
    getSongs(): Observable<DbItem<Song>[]> {
        const URL = this.apiURLGenerator.generateURL(this.apiURLGenerator.endpointNames.GET_SONGS);

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
        const URL = this.apiURLGenerator.generateURL(this.apiURLGenerator.endpointNames.SAVE_SONG);
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
        const URL = this.apiURLGenerator.generateURL(this.apiURLGenerator.endpointNames.UPDATE_SONG, model.songId);
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
        const URL = this.apiURLGenerator.generateURL(this.apiURLGenerator.endpointNames.DELETE_SONG, id);

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
        const URL = this.apiURLGenerator.generateURL(this.apiURLGenerator.endpointNames.LIST_DELETE_SONGS);
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

