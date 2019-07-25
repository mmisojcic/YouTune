import { DbItem, Action } from './../models/db-item.model';
import { SpinnerService } from '../../shared/services/spinner.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as server from '../../shared/config/api.config';
import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { ArtistConverter } from 'src/app/converters/artist.converter';
import { Artist } from 'src/app/models/artist.model';
import { ArtistDTO } from 'src/app/DTOs/artist.dto';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  url = server.api.fullUrl(server.api.artists.base);
  artistConverter: ArtistConverter = new ArtistConverter();

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) {}

  // get all Artist
  getArtist(): Observable<DbItem<Artist>[]> {
    this.spinnerService.spinnerShow();
    return this.http.get(this.url).pipe(
      map((res: ArtistDTO[]) => {
        const artist = this.artistConverter.DTOtoModelList(res);
        const dbItems: DbItem<Artist>[] = [];
        artist.forEach(g => {
          dbItems.push(new DbItem(g.name, Action.NONE, g));
        });
        return dbItems;
      }),
      catchError(err => {
        console.log('ERROR:::', err);
        return throwError(err.statusText);
      }),
      finalize(() => {
        // hide spinner
        this.spinnerService.spinnerHide();
        console.log('ALL ARTISTS LOADED:::');
      })
    );
  }

  saveArtist(model: Artist): Observable<Artist> {
    const dto = this.artistConverter.modelToDTO(model);
    return this.http.post(this.url, dto).pipe(
      map((res: ArtistDTO) => {
        return this.artistConverter.DTOtoModel(res);
      }),
      catchError(err => {
        console.log('ERROR: ', err);
        return throwError(err.statusText);
      }),
      finalize(() => {
        console.log('ARTIST SAVED:::');
      })
    );
  }

  updateArtist(model: Artist): Observable<Artist> {
    const dto = this.artistConverter.modelToDTO(model);
    return this.http.put(this.url + '/' + model.artistId, dto).pipe(
      map((res: ArtistDTO) => {
        return this.artistConverter.DTOtoModel(res);
      }),
      catchError(err => {
        console.log('ERROR: ', err);
        return throwError(err.statusText);
      }),
      finalize(() => {
        console.log('ARTIST UPDATED:::');
      })
    );
  }

  deleteArtist(id: number) {
    return this.http.delete(this.url + '/' + id).pipe(
      catchError(err => {
        console.log('ERROR: ', err);
        return throwError(err.statusText);
      }),
      finalize(() => {
        console.log('ARTIST DELETED:::');
      })
    );
  }

  deleteArtists(artist: Artist[]) {
    const dto = this.artistConverter.modelToDTOList(artist);

    return this.http.post(this.url + '/deleteList', dto).pipe(
      map((res: ArtistDTO[]) => {
        const artist = this.artistConverter.DTOtoModelList(res);
        const dbItems: DbItem<Artist>[] = [];
        artist.forEach(g => {
          dbItems.push(new DbItem(g.name, Action.NONE, g));
        });
        return dbItems;
      }),
      catchError(err => {
        console.log('ERROR: ', err);
        return throwError(err.statusText);
      }),
      finalize(() => {
        console.log('ARTIST DELETED:::');
      })
    );
  }
}
