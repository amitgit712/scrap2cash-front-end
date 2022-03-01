import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Services/login/login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName = '';
  profile_status;
  constructor(public _authService: LoginService) { }

  ngOnInit(){
 
  	this.userName = localStorage.getItem('username')
  	this.profile_status = localStorage.getItem('profile_status')

  }

 

 

}
