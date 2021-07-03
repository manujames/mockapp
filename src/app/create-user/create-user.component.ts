import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  constructor(private fb:FormBuilder, private content:ContentService) { }

  userForm = this.fb.group({
    userName: ['',[Validators.required, Validators.maxLength(50)]],
    email: ['',[Validators.required, Validators.maxLength(50), Validators.email]],  //Validators.pattern('^[a-z0-9.%+]+@[a-z0-9.-]+\.[a-z]{2,4}')
    phone: ['',[Validators.required, Validators.pattern('^([0-9]{10})$')]],
    gender: ['',[Validators.required, Validators.maxLength(1)]],
    age: ['',[Validators.required, Validators.pattern('^[0-9]+')]]
  });

  user = {
    userName: '',
    email: '',
    phone: '',
    gender: '',
    age: NaN,
  }

  ngOnInit(): void {
  }

  addUser(){
    this.user.userName = this.userForm.controls.userName.value;
    this.user.email = this.userForm.controls.email.value;
    this.user.phone = this.userForm.controls.phone.value;
    this.user.gender = this.userForm.controls.gender.value;
    this.user.age = parseInt(this.userForm.controls.age.value);
    
    this.content.addUser(this.user)
    .subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        (console.log(error));
      }
    );
  }
}
