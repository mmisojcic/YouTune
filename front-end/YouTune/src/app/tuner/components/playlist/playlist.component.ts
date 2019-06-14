import { Component, OnInit, Input } from '@angular/core';
import { Song } from 'src/app/models/song.model';

@Component({
  selector: 'yt-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  @Input() playlist: Song[];

  @Input() testLength: number[];

  constructor() {}

  ngOnInit() {}
}
