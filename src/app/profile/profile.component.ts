import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id!: string | null;
  user = {
    userName:'',
    email:'',
    phone:'',
    gender:'',
    age:''
  }
  constructor(private activeRoute: ActivatedRoute, private content:ContentService) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.content.getSingleUser(this.id)
    .subscribe(
      (user:any)=>{
        this.user.userName = user.data.userName;
        this.user.email = user.data.email;
        this.user.phone = user.data.phone;
        this.user.gender = user.data.gender;
        this.user.age = user.data.age;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
