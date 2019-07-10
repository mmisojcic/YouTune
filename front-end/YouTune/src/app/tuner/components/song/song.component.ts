import { Song } from './../../../models/song.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'yt-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  @Input() song: Song;

  constructor() {}

  ngOnInit() {}
}
