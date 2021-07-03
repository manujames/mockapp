import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ContentService } from '../content.service';

export interface DialogData {
  id: ''
}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    private content:ContentService,
    private snackBar:MatSnackBar,
    private router:Router,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  deleteUser(id:any){
    this.content.deleteUser(id)
    .subscribe(
      data=>{
        this.snackBar.open("Deleted user!",'',{duration:3000});
        this.dialogRef.close({event:"delete"});
      },
      error=>{
        if(error.status == 404){
          this.snackBar.open(error.statusText,'',{duration:3000});
          this.dialogRef.close({event:"404"});
        }
        else{
          this.snackBar.open('Sorry, Something went wrong.','',{duration:3000});
          this.dialogRef.close({event:"error"});
        }
      }
    )
  }
}
