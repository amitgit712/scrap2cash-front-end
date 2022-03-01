import { Injectable } from '@angular/core';
import { UserProfile }  from '../../ModelClasses/register/register';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
 
@Injectable({
  providedIn: 'root'
})

export class RegisterService {
      _url = environment.baseUrl+'register/'   //'http://localhost:8000/register/'
      _profile_url = environment.baseUrl+'user_profile/' //'http://localhost:8000/user_profile/'
      _update_password = environment.baseUrl+'update_password/' //'http://localhost:8000/update_password/'
  constructor(private  _http:HttpClient) { }

  // register(register: Register){
  // return this._http.post<any>(this._url,register);
  // } 

  register(register){
  return this._http.post<any>(this._url,register);
  }

  userProfile(): Observable<UserProfile[]>{
    return this._http.get<UserProfile[]>(this._profile_url)
 }

updateUserProfile(updated_profile){
  return this._http.post<any>(this._profile_url,updated_profile)
}


updatePassword(updated_password){
  return this._http.post<any>(this._update_password,updated_password)
}


getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }
 


}
