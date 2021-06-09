import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddElementComponent } from '../modals/add-element/add-element.component';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less']
})
export class HomepageComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'estimatedTime', 'category', 'date', 'status','actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  myList: any[]=[];
  dataSource = new MatTableDataSource();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  openAddDialog(){
    const dialogRef = this.dialog.open(AddElementComponent,{
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.myList.push(result.value);
        this.dataSource.data = this.myList;
      }
    });
    
  }
}
