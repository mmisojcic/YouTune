import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { PanelComponent } from './components/panel/panel.component';
import { SharedModule } from '../shared/shared.module';
import { GenresComponent } from './components/genres/genres.component';
import { DbItemsListComponent } from './components/db-items-list/db-items-list.component';
import { DbItemComponent } from './components/db-item/db-item.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { SongsComponent } from './components/songs/songs.component';

@NgModule({
  declarations: [
    PanelComponent,
    GenresComponent,
    DbItemsListComponent,
    DbItemComponent,
    ArtistsComponent,
    SongsComponent
  ],
  imports: [AdminRoutingModule, SharedModule]
})
export class AdminModule {}
