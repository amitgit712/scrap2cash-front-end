import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder }  from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { LoginService } from '../../Services/login/login.service';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.css']
})

export class LostPasswordComponent implements OnInit {
passwordResetForm: FormGroup;
error;
  constructor(
    private spinner: NgxSpinnerService,
  	private password_reset:LoginService, 
    private __router:Router,
  	) {

  	this.passwordResetForm = new FormGroup({
  			user_email : new FormControl(''),
  	});

   }

  ngOnInit(){
  }


passwordReset(){
	this.spinner.show();
	this.password_reset.resetPassword(this.passwordResetForm.value).subscribe(
	res=>{
		if(res['success']){
			this.__router.navigate(['/veryfy-otp'])
          this.spinner.hide();
		}
		else{

			this.error = res['error']
      this.spinner.hide();
		}
		console.log(res)

});


}



}
