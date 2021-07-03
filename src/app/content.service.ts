import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  api = "https://dev.digisuvidhacentre.com/Profile/api";
  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get(`${this.api}/MockUser`);
  }

  getSingleUser(id:any){
    return this.http.get(`${this.api}/MockUser/${id}`);
  }

  addUser(user:any){
    return this.http.post<any>(`${this.api}/MockUser`,user);
  }

  deleteUser(id:any){
    return this.http.delete(`${this.api}/MockUser/delete/${id}`);
  }
}
