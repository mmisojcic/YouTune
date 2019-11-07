import { ApiURLGeneratorService } from './../../shared/services/api-URL-generator.service';
import { DbItem, Action } from './../models/db-item.model';
import { SpinnerService } from '../../shared/services/spinner.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { ArtistDTO } from 'src/app/DTOs/artist.dto';
import { Artist } from 'src/app/models/artist.model';
import { ArtistConverter } from 'src/app/converters/artist.converter';
import { ArtistForSongConverter } from 'src/app/converters/artist-for-song.converter';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  artistConverter: ArtistConverter = new ArtistConverter();
  artistForSongConverter: ArtistForSongConverter = new ArtistForSongConverter();

  constructor(private http: HttpClient, private spinnerService: SpinnerService, private apiURLGenerator: ApiURLGeneratorService) {}

  // no songs artist
  getArtistsClean(): Observable<Artist[]> {
    const URL = this.apiURLGenerator.generateURL('getArtists');

    this.spinnerService.spinnerShow();
    return this.http.get(URL).pipe(
      map((res: ArtistDTO[]) => {
        return this.artistForSongConverter.DTOtoModelList(res);
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

  // get all Artists
  getArtists(): Observable<DbItem<Artist>[]> {
    const URL = this.apiURLGenerator.generateURL('getArtists');

    this.spinnerService.spinnerShow();
    return this.http.get(URL).pipe(
      map((res: ArtistDTO[]) => {
        console.log(res);
        return this.mapList(res);
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

  // save Artist
  saveArtist(model: Artist): Observable<DbItem<Artist>[]> {
    const URL = this.apiURLGenerator.generateURL('saveArtist');

    const DTO = this.artistConverter.modelToDTO(model);
    return this.http.post(URL, DTO).pipe(
      map((res: ArtistDTO[]) => {
        return this.mapList(res);
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

  // update Artist
  updateArtist(model: Artist): Observable<DbItem<Artist>[]> {
    const URL = this.apiURLGenerator.generateURL('updateArtist', model.artistId);
    const DTO = this.artistConverter.modelToDTO(model);

    return this.http.put(URL, DTO).pipe(
      map((res: ArtistDTO[]) => {
        return this.mapList(res);
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

  //delete Artist
  deleteArtist(id: number): Observable<DbItem<Artist>[]> {
    const URL = this.apiURLGenerator.generateURL('deleteArtist', id);

    return this.http.delete(URL).pipe(
      map((res: ArtistDTO[]) => {
        return this.mapList(res);
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

  // delete list of Artists
  deleteArtists(artist: Artist[]): Observable<DbItem<Artist>[]> {
    const URL = this.apiURLGenerator.generateURL('listDeleteArtists');
    const DTO = this.artistConverter.modelToDTOList(artist);

    return this.http.post(URL, DTO).pipe(
      map((res: ArtistDTO[]) => {
        return this.mapList(res);
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

  mapList(res: ArtistDTO[]) {
    const ARTISTS = this.artistConverter.DTOtoModelList(res);
    const DB_ITEMS: DbItem<Artist>[] = [];

    ARTISTS.forEach(a => {
      DB_ITEMS.push(new DbItem(a.name, Action.NONE, a));
    });
    return DB_ITEMS;
  }
}
