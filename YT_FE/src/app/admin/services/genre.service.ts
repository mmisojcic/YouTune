import { DbItem } from './../models/db-item.model';
import { SpinnerService } from './../../services/spinner.service';
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
    private spinerService: SpinnerService
  ) {}

  // get all genres
  getGenres(): Observable<DbItem<Genre>[]> {
    return this.http.get(this.url).pipe(
      map((res: GenreDTO[]) => {
        let genres = this.genreConverter.DTOtoModelList(res);
        let dbItems: DbItem<Genre>[] = [];
        genres.forEach(g => {
          dbItems.push(new DbItem(g.name, g));
        });
        return dbItems;
      }),
      catchError(err => {
        console.log('ERROR: ', err);
        return throwError(err.statusText);
      }),
      finalize(() => {
        // hide spinner
        this.spinerService.spinnerHide();
        console.log('kraj');
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
        // hide spinner
        this.spinerService.spinnerHide();
        console.log('kraj');
      })
    );
  }
}
