import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:["login.component.scss"]
})
export class LoginComponent implements OnInit{

  constructor(private http: HttpClient,private router: Router) { }
  checkToken=<string>localStorage.getItem('token');

  ngOnInit(): void {
      if (this.checkToken != null){
        this.router.navigate(['post_page']);
      }else{
        console.log("hello world")
      }
    }

  username="";
  password ="";
  token ="";
  addUser() {
    this.http.post<LoginResponse>('http://localhost:8000/user/signup', {
      username: this.username,
      password: this.password
    }).subscribe((data) => {
      alert(data);
    }, (error) => {
      alert(error.error.Error);
    });
  }

  login(){
    this.http.post<string>('http://localhost:8000/user/login',{username:this.username, password:this.password})
      .subscribe((data)=>{
      this.token=data;
      localStorage.setItem('token', this.token);
      this.router.navigate(['post_page']);
    },(error)=>{
      alert(error.error.Error)
    })
  }



}



export interface LoginResponse{
  username:string,
  password:string
}
