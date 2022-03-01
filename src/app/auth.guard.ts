import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { LoginService } from './Services/login/login.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private _authService:LoginService,
		private _router: Router){}
	canActivate(): boolean{
		if(this._authService.loggedIn()){
			return true
		}
		else{
			localStorage.removeItem('token')
  			localStorage.removeItem('username')
			this._router.navigate(['/login'])
			return false
		}
	}
  
}
