import { componentFactoryName } from '@angular/compiler';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ContentService } from '../content.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ProfileComponent } from '../profile/profile.component';
import { UsersDataSource, UsersItem } from './users-datasource';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UsersItem>;
  dataSource!: UsersDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['userName', 'email', 'phone', 'gender', 'age', 'delete'];

  constructor(
    private content:ContentService,
    private snackBar:MatSnackBar,
    private dialog:MatDialog
  ) { }

  ngOnInit():void {
    
  }

  ngAfterViewInit(): void {
    this.loadContent();
  }

  loadContent(){
    this.content.getUsers()
    .subscribe(
      (users:any)=>{
        this.dataSource = new UsersDataSource(users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      }
    );
  }

  delete(id:any){
    const dialogRef = this.dialog.open(DeleteDialogComponent,{
      data:{id:id}
    });
    dialogRef.afterClosed()
    .subscribe(
      data=>{
        if(data.event == 'delete' || data.event == '404'){
          this.loadContent();
        }
      }
    )
  }

  showUserProfile(id:any){
    this.content.getSingleUser(id)
    .subscribe(
      (user:any)=>{
        this.dialog.open(ProfileComponent,{
          data:user.data
        });
      },
      (error)=>{
        if(error.status == 404){
          this.snackBar.open(error.statusText,'',{duration:3000});
          this.loadContent();
        }
        else{
          this.snackBar.open('Sorry, Something went wrong.','',{duration:3000});
        }
      }
    );
  }
}