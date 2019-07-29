import { Action } from './../../models/db-item.model';
import { DbItemsService } from './../../services/db-items.service';
import {
  FormGroup,
  FormControl,
  Validators,
  NgForm,
  FormGroupDirective
} from '@angular/forms';
import { GenreService } from './../../services/genre.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { DbItem } from '../../models/db-item.model';
import { Observable, Subscription } from 'rxjs';
import { domFaderAnimation } from 'src/app/shared/animations/dom-fader.animation';
import { ngIfAnimation } from 'src/app/shared/animations/ngIf-fader.animation';
import { Genre } from 'src/app/models/genre.model';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'yt-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
  animations: [domFaderAnimation, ngIfAnimation]
})
export class GenresComponent implements OnInit, OnDestroy {
  matcher = new MyErrorStateMatcher();

  genre: Genre;
  genreForm: FormGroup;
  dbItems: DbItem<Genre>[];
  genreSubscription: Subscription;
  genresSubscription: Subscription;

  @ViewChild('name') nameInput: ElementRef<HTMLInputElement>;

  constructor(
    private genreService: GenreService,
    private dbItemsService: DbItemsService
  ) {}

  ngOnInit() {
    this.genreService.getGenres().subscribe((res: DbItem<Genre>[]) => {
      this.dbItems = res;
    });

    // Returns object that will represent form and its controls to the form local var
    this.genreForm = new FormGroup({
      id: new FormControl({ value: null, disabled: true }),
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z a-z]{1,50}$/)
      ])
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
          this.genreService
            .deleteGenres(modelList)
            .subscribe((res: DbItem<Genre>[]) => {
              this.dbItems = res;
            });
        } else {
          console.log('nije');
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.genreSubscription.unsubscribe();
    this.genresSubscription.unsubscribe();
  }

  onSave() {
    this.genre = new Genre(
      this.genreForm.controls['id'].value,
      this.genreForm.controls['name'].value.trim()
    );

    if (this.genreForm.controls['id'].value === null) {
      this.genreService
        .saveGenre(this.genre)
        .subscribe((res: DbItem<Genre>[]) => {
          this.dbItems = res;
        });
    } else {
      this.genreService
        .updateGenre(this.genre)
        .subscribe((res: DbItem<Genre>[]) => {
          this.dbItems = res;
        });
    }

    this.resetForm();
    this.nameInput.nativeElement.focus();
    this.nameInput.nativeElement.select();
  }

  resetForm() {
    this.genreForm.reset();
  }

  dbItemAction(dbItem: DbItem<Genre>) {
    if (dbItem.action === Action.EDIT) {
      this.genreForm.controls['id'].setValue(dbItem.item.genreId);
      this.genreForm.controls['name'].setValue(dbItem.item.name);
      this.nameInput.nativeElement.focus();
      this.nameInput.nativeElement.select();
    } else if (dbItem.action === Action.DELETE) {
      this.genreForm.reset();
      this.genreService
        .deleteGenre(dbItem.item.genreId)
        .subscribe((res: DbItem<Genre>[]) => {
          this.dbItems = res;
        });
    }
  }
}
