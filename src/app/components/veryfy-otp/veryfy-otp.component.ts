import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder }  from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { LoginService } from '../../Services/login/login.service';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-veryfy-otp',
  templateUrl: './veryfy-otp.component.html',
  styleUrls: ['./veryfy-otp.component.css']
})
export class VeryfyOtpComponent implements OnInit {

  otpForm:FormGroup;	
  error;
  constructor(
    private spinner: NgxSpinnerService,
    private password_reset:LoginService,
    private __router:Router,) {


this.otpForm = new FormGroup({

		otp :new FormControl(''),
});
 

   }

  ngOnInit(): void {
  }


veryfyOTP(){
	this.spinner.show();
	this.password_reset.veryfyOtp(this.otpForm.value).subscribe(
		res=>{
      //console.log("*/*/*/*///*/*/*/*/*/*/*/*/ direct res",res)
      if(res['success']){
          //console.log("/*/*",res.status)
          localStorage.setItem('username',res.first_name)
          localStorage.setItem('token',res.token)
          this.__router.navigate(['/profile'])
          this.spinner.hide()
      }

    else{
      this.error = res['error']
      //console.log("*/*/*/*/*/",res,"/*/*/*/*/*/*/*/*status---->",res.status);
      this.spinner.hide();
    }
	});

}



}
