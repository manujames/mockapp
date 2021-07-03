import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id!: string | null;
  user = {
    id:'',
    userName:'',
    email:'',
    phone:'',
    gender:'',
    age:''
  }
  constructor(
    private activeRoute: ActivatedRoute,
    private content:ContentService,
    private snackBar:MatSnackBar,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.content.getSingleUser(this.id)
    .subscribe(
      (user:any)=>{
        this.user.id = user.data.id;
        this.user.userName = user.data.userName;
        this.user.email = user.data.email;
        this.user.phone = user.data.phone;
        this.user.gender = user.data.gender;
        this.user.age = user.data.age;
      },
      (error)=>{
        this.snackBar.open("Sorry, Something went wrong.",'',{duration:3000});
        this.router.navigate(['/']);
      }
    );
  }

  deleteUser(id:any){
    this.content.deleteUser(id)
    .subscribe(
      data=>{
        this.snackBar.open("Deleted user!",'',{duration:3000});
        this.router.navigate(['/']);
      },
      error=>{
        if(error.status == 404){
          this.snackBar.open(error.statusText,'',{duration:3000});
          this.router.navigate(['/']);
        }
        else{
          this.snackBar.open('Sorry, Something went wrong.','',{duration:3000});
        }
      }
    )
  }

}
