import { DbItemsService } from './../../services/db-items.service';
import { SpinnerService } from '../../../shared/services/spinner.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { GenreService } from './../../services/genre.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Genre } from 'src/app/models/genre.model';
import { DbItem } from '../../models/db-item.model';
import { Observable, Subscription } from 'rxjs';
import { domFaderAnimation } from 'src/app/shared/animations/dom-fader.animation';

@Component({
  selector: 'yt-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
  animations: [domFaderAnimation]
})
export class GenresComponent implements OnInit, OnDestroy {
  genre: Genre;
  genreForm: FormGroup;
  dbItemsSubscription: Subscription;
  dbItems$: Observable<DbItem<Genre>[]>;
  genreIdSubscription: Subscription;
  genreSubscription: Subscription;

  constructor(
    private genreService: GenreService,
    private dbItemsService: DbItemsService
  ) {}

  ngOnInit() {
    this.dbItems$ = this.genreService.getGenres();

    // Returns object that will represent form nad its controls to the form local var
    this.genreForm = new FormGroup({
      id: new FormControl({ value: null, disabled: true }),
      name: new FormControl(null)
    });

    // load genre to form for editing
    this.genreSubscription = this.dbItemsService.genreEmitter.subscribe(res => {
      this.genreForm.controls['id'].setValue(res.genreId);
      this.genreForm.controls['name'].setValue(res.name);
    });

    this.genreIdSubscription = this.dbItemsService.genreIdEmitter.subscribe(
      res => {
        this.genreForm.reset();
        this.genreService.deleteGenre(res).subscribe(() => {
          this.dbItems$ = this.genreService.getGenres();
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.genreSubscription.unsubscribe();
    this.genreIdSubscription.unsubscribe();
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

    this.genreForm.reset();
  }

  resetForm() {
    this.genreForm.reset();
  }
}
