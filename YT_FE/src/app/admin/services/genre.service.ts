import { Genre } from '../../models/genre.model';
import { GenreDTO } from '../../DTOs/genre.dto';
import { DbItem, Action } from './../models/db-item.model';
import { SpinnerService } from '../../shared/services/spinner.service';
import { GenreConverter } from './../../converters/genre.converter';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { ApiURLGeneratorService } from 'src/app/shared/services/api-URL-generator.service';
import { ServerResponse } from 'src/app/shared/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  genreConverter: GenreConverter = new GenreConverter();

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService,
    private apiURLGenerator: ApiURLGeneratorService
  ) { }

  getGenresClean(): Observable<Genre[]> {
    const URL = this.apiURLGenerator.generateURL('getGenres');

    this.spinnerService.spinnerShow();
    return this.http.get(URL).pipe(
      map((res: ServerResponse<GenreDTO[]>) => {
        return this.genreConverter.DTOtoModelList(res.payload);
      }),
      catchError(err => {
        console.log('ERROR:::', err);
        return throwError(err.statusText);
      }),
      finalize(() => {
        // hide spinner
        this.spinnerService.spinnerHide();
        console.log('ALL GENRES LOADED:::');
      })
    );
  }

  // get all genres
  getGenres(): Observable<DbItem<Genre>[]> {
    const URL = this.apiURLGenerator.generateURL('getGenres');

    this.spinnerService.spinnerShow();
    return this.http.get(URL).pipe(
      map((res: ServerResponse<GenreDTO[]>) => {
        return this.mapList(res.payload);
      }),
      catchError(err => {
        console.log('ERROR:::', err);
        return throwError(err.statusText);
      }),
      finalize(() => {
        // hide spinner
        this.spinnerService.spinnerHide();
        console.log('ALL GENRES LOADED:::');
      })
    );
  }

  saveGenre(model: Genre): Observable<DbItem<Genre>[]> {
    const URL = this.apiURLGenerator.generateURL('saveGenre');
    const DTO = this.genreConverter.modelToDTO(model);

    return this.http.post(URL, DTO).pipe(
      map((res: ServerResponse<GenreDTO[]>) => {
        return this.mapList(res.payload);
      }),
      catchError(err => {
        console.log('ERROR: ', err);
        return throwError(err.statusText);
      }),
      finalize(() => {
        console.log('GENRE SAVED:::');
      })
    );
  }

  updateGenre(model: Genre): Observable<DbItem<Genre>[]> {
    const URL = this.apiURLGenerator.generateURL('updateGenre', model.genreId);
    const DTO = this.genreConverter.modelToDTO(model);

    return this.http.put(URL, DTO).pipe(
      map((res: ServerResponse<GenreDTO[]>) => {
        return this.mapList(res.payload);
      }),
      catchError(err => {
        console.log('ERROR: ', err);
        return throwError(err.statusText);
      }),
      finalize(() => {
        console.log('GENRE UPDATED:::');
      })
    );
  }

  deleteGenre(id: number) {
    const URL = this.apiURLGenerator.generateURL('deleteGenre', id);

    return this.http.delete(URL).pipe(
      map((res: ServerResponse<GenreDTO[]>) => {
        return this.mapList(res.payload);
      }),
      catchError(err => {
        console.log('ERROR: ', err);
        return throwError(err.statusText);
      }),
      finalize(() => {
        console.log('GENRE DELETED:::');
      })
    );
  }

  deleteGenres(genres: Genre[]) {
    const URL = this.apiURLGenerator.generateURL('listDeleteGenres');
    const DTO = this.genreConverter.modelToDTOList(genres);

    return this.http.post(URL, DTO).pipe(
      map((res: ServerResponse<GenreDTO[]>) => {
        return this.mapList(res.payload);
      }),
      catchError(err => {
        console.log('ERROR: ', err);
        return throwError(err.statusText);
      }),
      finalize(() => {
        console.log('GENRE DELETED:::');
      })
    );
  }

  mapList(res: GenreDTO[]) {
    const genres = this.genreConverter.DTOtoModelList(res);
    const dbItems: DbItem<Genre>[] = [];
    genres.forEach(g => {
      dbItems.push(new DbItem(g.name, Action.NONE, g));
    });
    return dbItems;
  }
}
