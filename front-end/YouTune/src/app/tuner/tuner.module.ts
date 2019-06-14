import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TunerRoutingModule } from './tuner-routing.module';
import { TunerComponent } from './components/tuner/tuner.component';
import { SharedModule } from '../shared/shared.module';
import { PlayerComponent } from './components/player/player.component';
import { PlaylistComponent } from './components/playlist/playlist.component';

@NgModule({
  declarations: [TunerComponent, PlayerComponent, PlaylistComponent],
  imports: [CommonModule, TunerRoutingModule, SharedModule]
})
export class TunerModule {}
