import { Component, OnInit } from '@angular/core';
import { Register } from '../../ModelClasses/register/register';
import { RegisterService } from '../../Services/register/register.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit {
  registerModel = new Register('','','','',)
  public email_id;
  public error;
  constructor(private _registerService:RegisterService,
   private __route:Router, private spinner: NgxSpinnerService) { } 

  ngOnInit(): void {
 
  }

  onRegister(){
    this.spinner.show()
    this._registerService.register(this.registerModel).subscribe(
      data => { 
        this.spinner.hide()
        this.email_id =data;
        console.log("Success!",data)
        

    }, 
    error => { 
      this.error ="something went wrong if problem persist write us on contact@scrap2cash.in";
      this.spinner.hide()
      //console.error("Error",error)
    }

      
    )
  }


}
