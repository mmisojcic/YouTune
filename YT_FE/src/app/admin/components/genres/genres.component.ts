import { SpinnerService } from './../../../services/spinner.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { GenreService } from './../../services/genre.service';
import { Component, OnInit, Input } from '@angular/core';
import { Genre } from 'src/app/models/genre.model';
import { DbItem } from '../../models/db-item.model';
import { Observable } from 'rxjs';
import { domFaderAnimation } from 'src/app/shared/animations/dom-fader.animation';

@Component({
  selector: 'yt-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
  animations: [domFaderAnimation]
})
export class GenresComponent implements OnInit {
  genre: Genre;
  genreForm: FormGroup;
  dbItems$: Observable<DbItem<Genre>[]>;

  constructor(
    private genreService: GenreService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.dbItems$ = this.genreService.getGenres();

    // Returns object that will represent form nad its controls to the form local var
    this.genreForm = new FormGroup({
      id: new FormControl({ value: null, disabled: true }),
      name: new FormControl(null)
    });
  }

  onSave() {
    this.genre = new Genre(
      this.genreForm.controls['id'].value,
      this.genreForm.controls['name'].value
    );

    this.spinnerService.spinnerShow();

    this.genreService.saveGenre(this.genre).subscribe(() => {
      this.dbItems$ = this.genreService.getGenres();
    });
  }
}
