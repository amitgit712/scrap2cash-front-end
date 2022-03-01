import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login }  from '../../ModelClasses/login/login';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  _url = environment.baseUrl+'login/'  //'http://localhost:8000/login/';
  _password_reset = environment.baseUrl+'user_password_reset/'
  _verfy_otp = environment.baseUrl+'veryfy_otp/'
  constructor(private http:HttpClient,private _router:Router) { }
  login(user_login:Login){

    return this.http.post<any>(this._url,user_login);
  }

  loggedIn(){

    return !! localStorage.getItem('token')
  } 

  getToken(){
    return localStorage.getItem('token')
  }

resetPassword(form){
    return this.http.post<any>(this._password_reset,form);
}

veryfyOtp(data){
    return this.http.post<any>(this._verfy_otp,data)
}

  logoutUser(){
    // localStorage.removeItem('token')
    // localStorage.removeItem('username')
    localStorage.clear()
    this._router.navigate(['/login'])

  }
}
