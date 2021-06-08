import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less']
})
export class HomepageComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'estimatedTime', 'category', 'date', 'status'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor() { }

  ngOnInit(): void {
  }

}
