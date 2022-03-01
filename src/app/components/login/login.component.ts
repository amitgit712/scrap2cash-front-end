import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl  }   from '@angular/forms';
import { Login }  from '../../ModelClasses/login/login';
import { LoginService } from '../../Services/login/login.service';
import { Router }  from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})

export class LoginComponent implements OnInit {
  
  userLoginData = new Login('','');
  // submitted = false;
  public error; 
  constructor(
    private _loginService:LoginService,
    private __router:Router,
    private spinner: NgxSpinnerService
    ){ }

  ngOnInit() {

  } 

  userLogin(){
    // this.submitted = true;
    // console.log("form data:--",this.userLoginData)
    this.spinner.show()
    this._loginService.login(this.userLoginData)
    .subscribe(
        data => {
          if(data['error']){
            this.error = data['error'];
            // console.log("*/*/*/*/*/*/err",this.error)
            this.spinner.hide()  
          } 
          else{
          localStorage.setItem('username',data.first_name)
          localStorage.setItem('token',data.token)
          this.__router.navigate(['/profile'])
          this.spinner.hide()
        }
      }
        // err => {
        //   this.error = err;
        //   console.log("*/*/*/*/*/*/*//*/* error",this.error)
        //   this.spinner.hide()
        //   //console.log("Error",err)
        // }

    )

   

  }
}
