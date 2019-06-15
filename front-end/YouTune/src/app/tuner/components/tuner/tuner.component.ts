import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yt-tuner',
  templateUrl: './tuner.component.html',
  styleUrls: ['./tuner.component.scss']
})
export class TunerComponent implements OnInit {
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  constructor() {}

  ngOnInit() {}
}
