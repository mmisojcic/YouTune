import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'yt-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() listForFiltering: any[] = [];

  constructor() {}

  ngOnInit() {}

  // onSearch(e: HTMLInputElement) {
  //   const inputRegExp = new RegExp(e.value.toLowerCase());

  //   const tmpDbItems: DbItem<Genre | Artist>[] = [];

  //   this.dbItemsCached.forEach(dbItem => {
  //     if (inputRegExp.test(dbItem.title.toLowerCase())) {
  //       tmpDbItems.push(dbItem);
  //     }
  //   });

  //   this.listForFiltering = tmpDbItems;
  // }
}
