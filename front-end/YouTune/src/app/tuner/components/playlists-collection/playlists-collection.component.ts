import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yt-playlists-collection',
  templateUrl: './playlists-collection.component.html',
  styleUrls: ['./playlists-collection.component.scss']
})
export class PlaylistsCollectionComponent implements OnInit {
  testLength = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  constructor() {}

  ngOnInit() {}
}
