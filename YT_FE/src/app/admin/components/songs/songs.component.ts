import { GenreService } from './../../services/genre.service';
import { Song } from 'src/app/models/song.model';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { DbItem, Action } from '../../models/db-item.model';
import { SongService } from '../../services/song.service';
import { DbItemsService } from '../../services/db-items.service';
import { ngIfAnimation } from 'src/app/shared/animations/ngIf-fader.animation';
import { Genre } from 'src/app/models/genre.model';
import { Artist } from 'src/app/models/artist.model';
import { ArtistService } from '../../services/artist.service';

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
  selector: 'yt-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss'],
  animations: [ngIfAnimation]
})
export class SongsComponent implements OnInit, OnDestroy {
  matcher = new MyErrorStateMatcher();

  song: Song;
  songForm: FormGroup;
  dbItems: DbItem<Song>[];
  songSubscription: Subscription;
  songsSubscription: Subscription;

  @ViewChild('title') titleInput: ElementRef<HTMLInputElement>;

  genres: Genre[] = [];
  artists: Artist[] = [];

  constructor(
    private songService: SongService,
    private genreService: GenreService,
    private artistService: ArtistService,
    private dbItemsService: DbItemsService
  ) {}

  ngOnInit() {
    this.songService.getSongs().subscribe((res: DbItem<Song>[]) => {
      this.dbItems = res;
      console.log(res);
    });

    this.genreService.getGenresClean().subscribe((res: Genre[]) => {
      this.genres = res;
    });
    this.artistService.getArtistsClean().subscribe((res: Artist[]) => {
      this.artists = res;
    });

    // Returns object that will represent form and its controls to the form local var
    this.songForm = new FormGroup({
      id: new FormControl({ value: null, disabled: true }),
      title: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z a-z 0-9]{1,50}$/)
      ]),
      youtubeID: new FormControl(null, [Validators.required]),
      genres: new FormControl(null, [Validators.required]),
      artists: new FormControl(null, [Validators.required])
    });

    this.songSubscription = this.dbItemsService.dbItemEmitter.subscribe(
      (dbItem: DbItem<Song>) => {
        this.dbItemAction(dbItem);
      }
    );

    this.songsSubscription = this.dbItemsService.dbItemsEmitter.subscribe(
      (markedDbItems: DbItem<Song>[]) => {
        let modelList;

        this.dbItemsService.checkItemType();

        if (this.dbItemsService.IS_GENRES) {
          console.log('genre je');
          modelList = this.dbItemsService.dbItemsToModelList<Song>(
            markedDbItems
          );
          this.songService
            .deleteSongs(modelList)
            .subscribe((res: DbItem<Song>[]) => {
              this.dbItems = res;
            });
        } else {
          console.log('nije');
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.songSubscription.unsubscribe();
    this.songsSubscription.unsubscribe();
  }

  onSave() {
    this.song = new Song();
    this.song.songId = this.songForm.controls['id'].value;
    this.song.title = this.songForm.controls['title'].value.trim();
    this.song.youtubeID = this.songForm.controls['youtubeID'].value.trim();
    this.song.genreId = this.songForm.controls['genres'].value.genreId;
    this.song.artistsSongs = this.songForm.controls['artists'].value;

    console.log(this.song, 'sssssss');

    if (this.songForm.controls['id'].value === null) {
      this.songService.saveSong(this.song).subscribe((res: DbItem<Song>[]) => {
        this.dbItems = res;
      });
    } else {
      this.songService
        .updateSong(this.song)
        .subscribe((res: DbItem<Song>[]) => {
          this.dbItems = res;
        });
    }

    this.resetForm();
    this.titleInput.nativeElement.focus();
    this.titleInput.nativeElement.select();
  }

  resetForm() {
    this.songForm.reset();
  }

  dbItemAction(dbItem: DbItem<Song>) {
    if (dbItem.action === Action.EDIT) {
      this.songForm.controls['id'].setValue(dbItem.item.songId);
      this.songForm.controls['title'].setValue(dbItem.item.title);
      this.titleInput.nativeElement.focus();
      this.titleInput.nativeElement.select();
    } else if (dbItem.action === Action.DELETE) {
      this.songForm.reset();
      this.songService
        .deleteSong(dbItem.item.songId)
        .subscribe((res: DbItem<Song>[]) => {
          this.dbItems = res;
        });
    }
  }

  onOpenedChange() {
    if (this.genres.length === 0) {
      this.genreService.getGenresClean().subscribe((res: Genre[]) => {
        this.genres = res;
      });
    }
  }
}
