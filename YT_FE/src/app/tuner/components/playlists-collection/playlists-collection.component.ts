import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'yt-playlists-collection',
  templateUrl: './playlists-collection.component.html',
  styleUrls: ['./playlists-collection.component.scss']
})
export class PlaylistsCollectionComponent implements OnInit {
  testLength = [1, 2, 3, 4, 5];

  constructor() {}

  ngOnInit() {}
}
