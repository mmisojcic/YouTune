import { Action } from './../../models/db-item.model';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { domFaderAnimation } from 'src/app/shared/animations/dom-fader.animation';
import { ngIfAnimation } from 'src/app/shared/animations/ngIf-fader.animation';
import { Subscription } from 'rxjs';
import { DbItem } from '../../models/db-item.model';
import { ArtistService } from '../../services/artist.service';
import { DbItemsService } from '../../services/db-items.service';
import { Artist } from 'src/app/models/artist.model';

@Component({
  selector: 'yt-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
  animations: [domFaderAnimation, ngIfAnimation]
})
export class ArtistsComponent implements OnInit, OnDestroy {
  artist: Artist;
  artistForm: FormGroup;
  dbItems: DbItem<Artist>[];
  artistSubscription: Subscription;
  artistsSubscription: Subscription;

  @ViewChild('name') nameInput: ElementRef<HTMLInputElement>;

  constructor(
    private artistService: ArtistService,
    private dbItemsService: DbItemsService
  ) {}

  ngOnInit() {
    this.artistService.getArtists().subscribe((res: DbItem<Artist>[]) => {
      this.dbItems = res;
    });

    // Returns object that will represent form and its controls to the form local var
    this.artistForm = new FormGroup({
      id: new FormControl({ value: null, disabled: true }),
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z a-z]{1,50}$/)
      ])
    });

    this.artistSubscription = this.dbItemsService.dbItemEmitter.subscribe(
      (dbItem: DbItem<Artist>) => {
        this.dbItemAction(dbItem);
      }
    );

    this.artistsSubscription = this.dbItemsService.dbItemsEmitter.subscribe(
      (markedDbItems: DbItem<Artist>[]) => {
        let modelList;

        this.dbItemsService.checkItemType();

        if (this.dbItemsService.IS_ARTIST) {
          console.log('artist je');
          modelList = this.dbItemsService.dbItemsToModelList<Artist>(
            markedDbItems
          );
          this.artistService
            .deleteArtists(modelList)
            .subscribe((res: DbItem<Artist>[]) => {
              this.dbItems = res;
            });
        } else {
          console.log('nije');
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.artistSubscription.unsubscribe();
    this.artistsSubscription.unsubscribe();
  }

  onSave() {
    this.artist = new Artist(
      this.artistForm.controls['id'].value,
      this.artistForm.controls['name'].value.trim()
    );

    if (this.artistForm.controls['id'].value === null) {
      this.artistService
        .saveArtist(this.artist)
        .subscribe((res: DbItem<Artist>[]) => {
          this.dbItems = res;
        });
    } else {
      this.artistService
        .updateArtist(this.artist)
        .subscribe((res: DbItem<Artist>[]) => {
          this.dbItems = res;
        });
    }

    this.resetForm();
    this.nameInput.nativeElement.focus();
    this.nameInput.nativeElement.select();
  }

  resetForm() {
    this.artistForm.reset();
  }

  dbItemAction(dbItem: DbItem<Artist>) {
    if (dbItem.action === Action.EDIT) {
      this.artistForm.controls['id'].setValue(dbItem.item.artistId);
      this.artistForm.controls['name'].setValue(dbItem.item.name);
      this.nameInput.nativeElement.focus();
      this.nameInput.nativeElement.select();
    } else if (dbItem.action === Action.DELETE) {
      this.artistForm.reset();
      this.artistService
        .deleteArtist(dbItem.item.artistId)
        .subscribe((res: DbItem<Artist>[]) => {
          this.dbItems = res;
        });
    }
  }
}
