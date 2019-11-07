import { GenreService } from './../../services/genre.service';
import { Song } from 'src/app/models/song.model';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DbItem, Action } from '../../models/db-item.model';
import { SongService } from '../../services/song.service';
import { DbItemsService } from '../../services/db-items.service';
import { ngIfAnimation } from 'src/app/shared/animations/ngIf-fader.animation';
import { Genre } from 'src/app/models/genre.model';
import { Artist } from 'src/app/models/artist.model';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'yt-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss'],
  animations: [ngIfAnimation]
})
export class SongsComponent implements OnInit, OnDestroy {
  song: Song;
  songForm: FormGroup;
  dbItems: DbItem<Song>[];
  songSubscription: Subscription;
  songsSubscription: Subscription;

  @ViewChild('title') titleInput: ElementRef<HTMLInputElement>;
  @ViewChild('filter') filter: ElementRef<HTMLInputElement>;

  genres: Genre[] = [];
  artists: Artist[] = [];
  cachedArtists: Artist[] = [];

  selectedGenre: Genre = new Genre();
  selectedArtists: Artist[] = [];
  checkSelectedArtists: string[] = [];

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
      this.cachedArtists = res;
      console.log(this.cachedArtists);
      this.artists = this.cachedArtists;
      console.log(this.artists);
    });

    // Returns object that will represent form and its controls to the form local var
    this.songForm = new FormGroup({
      filter: new FormControl(),
      id: new FormControl({ value: null, disabled: true }),
      title: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z a-z 0-9]{1,50}$/)]),
      youtubeID: new FormControl(null, [Validators.required]),
      genres: new FormControl(null, [Validators.required]),
      artists: new FormControl(null, [Validators.required])
    });

    this.songSubscription = this.dbItemsService.dbItemEmitter.subscribe((dbItem: DbItem<Song>) => {
      this.dbItemAction(dbItem);
    });

    this.songsSubscription = this.dbItemsService.dbItemsEmitter.subscribe((markedDbItems: DbItem<Song>[]) => {
      let modelList;

      if (this.dbItemsService.IS_SONG) {
        console.log('song je');
        modelList = this.dbItemsService.dbItemsToModelList<Song>(markedDbItems);
        this.songService.deleteSongs(modelList).subscribe((res: DbItem<Song>[]) => {
          this.dbItems = res;
        });
      } else {
        console.log('nije');
      }
    });
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
    this.song.genreId = this.selectedGenre.genreId;
    this.song.artistsSongs = this.selectedArtists;

    if (this.songForm.controls['id'].value === null) {
      this.songService.saveSong(this.song).subscribe((res: DbItem<Song>[]) => {
        this.dbItems = res;
      });
    } else {
      this.songService.updateSong(this.song).subscribe((res: DbItem<Song>[]) => {
        this.dbItems = res;
      });
    }

    this.songForm.reset();
    this.titleInput.nativeElement.focus();
    this.titleInput.nativeElement.select();
  }

  onNew() {
    this.songForm.reset();
    this.titleInput.nativeElement.focus();
    this.titleInput.nativeElement.select();
  }

  dbItemAction(dbItem: DbItem<Song>) {
    if (dbItem.action === Action.EDIT) {
      this.selectedGenre = this.genres.find(g => g.genreId === dbItem.item.genre.genreId);

      this.selectedArtists = dbItem.item.artists;

      this.songForm.controls['id'].setValue(dbItem.item.songId);
      this.songForm.controls['title'].setValue(dbItem.item.title);
      this.songForm.controls['youtubeID'].setValue(dbItem.item.youtubeID);
      this.songForm.controls['genres'].setValue(this.selectedGenre.name);
      this.songForm.controls['artists'].setValue(this.selectedArtists);

      this.checkSelectedArtists = [];

      dbItem.item.artists.forEach(a => {
        this.checkSelectedArtists.push(a.name);
      });

      this.titleInput.nativeElement.focus();
      this.titleInput.nativeElement.select();
    } else if (dbItem.action === Action.DELETE) {
      this.songForm.reset();
      this.songService.deleteSong(dbItem.item.songId).subscribe((res: DbItem<Song>[]) => {
        this.dbItems = res;
      });
    }
  }

  onGenreSelectionChange(data: any) {
    this.selectedGenre = this.genres.find(g => g.name === data.value);
  }

  onArtistsSelectionChange(data: any) {
    let tmpSelectedArtists: Artist[] = [];

    data.value.forEach((value: string, i) => {
      this.artists.forEach(a => {
        if (value === a.name) {
          tmpSelectedArtists.push(a);
        }
      });
    });

    this.selectedArtists = tmpSelectedArtists;
    this.checkSelectedArtists = data.value;

    console.log(this.selectedArtists);
    console.log(this.checkSelectedArtists);
    console.log(data);
  }

  onSearch(e: HTMLInputElement) {
    const inputRegExp = new RegExp(e.value.toLowerCase());

    this.artists = this.cachedArtists.filter(ca => {
      return inputRegExp.test(ca.name.toLowerCase());
    });

    console.log(this.selectedArtists);
    console.log(this.checkSelectedArtists);
  }

  multiSelectToggle(e: boolean) {
    if (e === false) {
      this.filter.nativeElement.value = '';
      this.artists = this.cachedArtists;
    }
  }
}
