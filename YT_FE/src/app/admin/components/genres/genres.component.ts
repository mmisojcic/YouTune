import { Action } from './../../models/db-item.model';
import { DbItemsService } from './../../services/db-items.service';
import { FormGroup, FormControl } from '@angular/forms';
import { GenreService } from './../../services/genre.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Genre } from 'src/app/models/genre.model';
import { DbItem } from '../../models/db-item.model';
import { Observable, Subscription } from 'rxjs';
import { domFaderAnimation } from 'src/app/shared/animations/dom-fader.animation';
import { ngIfAnimation } from 'src/app/shared/animations/ngIf-fader.animation';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'yt-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
  animations: [domFaderAnimation, ngIfAnimation]
})
export class GenresComponent implements OnInit, OnDestroy {
  genre: Genre;
  genreForm: FormGroup;
  dbItems$: Observable<DbItem<Genre>[]>;
  genreSubscription: Subscription;
  genresSubscription: Subscription;

  constructor(
    private genreService: GenreService,
    private dbItemsService: DbItemsService
  ) {}

  ngOnInit() {
    this.dbItems$ = this.genreService.getGenres();

    // Returns object that will represent form and its controls to the form local var
    this.genreForm = new FormGroup({
      id: new FormControl({ value: null, disabled: true }),
      name: new FormControl(null)
    });

    this.genreSubscription = this.dbItemsService.dbItemEmitter.subscribe(
      (dbItem: DbItem<Genre>) => {
        this.dbItemAction(dbItem);
      }
    );

    this.genresSubscription = this.dbItemsService.dbItemsEmitter.subscribe(
      (markedDbItems: DbItem<Genre>[]) => {
        let modelList;

        this.dbItemsService.checkItemType();

        if (this.dbItemsService.IS_GENRES) {
          console.log('genre je');
          modelList = this.dbItemsService.dbItemsToModelList<Genre>(
            markedDbItems
          );
          this.genreService.deleteGenres(modelList).subscribe(() => {
            this.dbItems$ = this.genreService.getGenres();
          });
        } else {
          console.log('nije');
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.genreSubscription.unsubscribe();
  }

  onSave() {
    this.genre = new Genre(
      this.genreForm.controls['id'].value,
      this.genreForm.controls['name'].value
    );

    if (this.genreForm.controls['id'].value === null) {
      this.genreService.saveGenre(this.genre).subscribe(() => {
        this.dbItems$ = this.genreService.getGenres();
      });
    } else {
      this.genreService.updateGenre(this.genre).subscribe(() => {
        this.dbItems$ = this.genreService.getGenres();
      });
    }

    this.resetForm();
  }

  resetForm() {
    this.genreForm.reset();
  }

  dbItemAction(dbItem: DbItem<Genre>) {
    if (dbItem.action === Action.EDIT) {
      this.genreForm.controls['id'].setValue(dbItem.item.genreId);
      this.genreForm.controls['name'].setValue(dbItem.item.name);
    } else if (dbItem.action === Action.DELETE) {
      this.genreForm.reset();
      this.genreService.deleteGenre(dbItem.item.genreId).subscribe(() => {
        this.dbItems$ = this.genreService.getGenres();
      });
    }
  }
}
