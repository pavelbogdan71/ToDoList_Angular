import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StatusType } from '../helpers/status-type';
import { AddElementComponent } from '../modals/add-element/add-element.component';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less']
})
export class HomepageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['title', 'description', 'estimatedTime', 'category', 'date', 'status','actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  myList: any[]=[];
  dataSource = new MatTableDataSource();

  userEmail;
  titleSearchValue;
  
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
    private router:Router) { }
    
    ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
    }

  ngOnInit(): void {

    if(localStorage.getItem("ConnectedUser")){
      this.userEmail = JSON.parse(localStorage.getItem("ConnectedUser"));
      if(localStorage.getItem(this.userEmail)){
        this.myList = JSON.parse(localStorage.getItem(this.userEmail));
        this.dataSource.data = this.myList;
      }
    }else{
      (<any>this.router).navigate(["/login"]);
    }
  }


  openAddDialog(){
    const dialogRef = this.dialog.open(AddElementComponent,{
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.myList.push(result.value);
        this.dataSource.data = this.myList;

        localStorage.setItem(this.userEmail,JSON.stringify(this.myList));
      }
    });
    
  }

  searchByTitle(){
    this.dataSource.data = this.myList.filter(e => e.title.toLowerCase().startsWith(this.titleSearchValue.toLowerCase()));
  }

  clearTitleSearch(){
    this.titleSearchValue = '';
    this.dataSource.data = this.myList;
  }

  onDelete(row){
    const index = this.myList.indexOf(row);
    if(index > -1){
      this.myList.splice(index,1);
      this.dataSource.data = this.myList;
      localStorage.setItem(this.userEmail,JSON.stringify(this.myList));
    }
  }

  changeStatus(row){

     if(row.status==StatusType.IN_PROGRESS){
       row.status = StatusType.FINISHED;
     }
     if(row.status==StatusType.UNFINISHED){
      row.status = StatusType.IN_PROGRESS;
     }
    localStorage.setItem(this.userEmail,JSON.stringify(this.myList));

  }
}
