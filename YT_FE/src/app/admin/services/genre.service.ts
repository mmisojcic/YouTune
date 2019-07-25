import { DbItem, Action } from './../models/db-item.model';
import { SpinnerService } from '../../shared/services/spinner.service';
import { GenreConverter } from './../../converters/genre.converter';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as server from '../../shared/config/api.config';
import { Genre } from 'src/app/models/genre.model';
import { Observable, throwError } from 'rxjs';
import { GenreDTO } from 'src/app/DTOs/genre.dto';
import { map, catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  url = server.api.fullUrl(server.api.genres.base);
  genreConverter: GenreConverter = new GenreConverter();

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) {}

  // get all genres
  getGenres(): Observable<DbItem<Genre>[]> {
    this.spinnerService.spinnerShow();
    return this.http.get(this.url).pipe(
      map((res: GenreDTO[]) => {
        return this.map(res);
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

  saveGenre(model: Genre): Observable<Genre> {
    const dto = this.genreConverter.modelToDTO(model);
    return this.http.post(this.url, dto).pipe(
      map((res: GenreDTO) => {
        return this.genreConverter.DTOtoModel(res);
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

  updateGenre(model: Genre): Observable<Genre> {
    const dto = this.genreConverter.modelToDTO(model);
    return this.http.put(this.url + '/' + model.genreId, dto).pipe(
      map((res: GenreDTO) => {
        return this.genreConverter.DTOtoModel(res);
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
    return this.http.delete(this.url + '/' + id).pipe(
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
    const dto = this.genreConverter.modelToDTOList(genres);

    return this.http.post(this.url + '/deleteList', dto).pipe(
      map((res: GenreDTO[]) => {
        return this.map(res);
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

  map(res: GenreDTO[]) {
    const genres = this.genreConverter.DTOtoModelList(res);
    const dbItems: DbItem<Genre>[] = [];
    genres.forEach(g => {
      dbItems.push(new DbItem(g.name, Action.NONE, g));
    });
    return dbItems;
  }
}
