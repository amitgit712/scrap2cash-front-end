import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Services/login/login.service';
import { RegisterService } from '../../Services/register/register.service';
import { ActivatedRoute,Router } from '@angular/router'; 
import { UserProfile }  from '../../ModelClasses/register/register';
import { FormGroup,FormControl,Validators}  from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { CreatepostService } from '../../Services/createpost/createpost.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

        public profile_data = []
        public bussiness_type;
        public  category_name; 
        public  subcategory_name;
        public user_data;
        public profile_status;

        public susscess;
        public error;

        public all_category

        profileForm = new FormGroup({
          bussiness_category: new  FormControl(),
          category_s: new  FormControl(),
          subcategory_s: new  FormControl(),
          user_conatct: new FormControl(),
            country: new FormControl(),
            state: new FormControl(),
            city: new FormControl(),
            zip_code: new FormControl(),
            detail_address: new FormControl()
      
      }); 

      updatePasswordForm = new FormGroup({
          password: new FormControl("Enter New Password"),
          confirm_password: new FormControl("Enter New Password")
      })
    
    constructor(private _profile_route:RegisterService,
      private _createPostService:CreatepostService, 
       private __router:Router,private spinner: NgxSpinnerService) { }

 ngOnInit(){
  // this.spinner.show() 

  localStorage.removeItem('profile_status')
    
    this._createPostService.GetCategoryType().subscribe(
    data =>{ 
       if(data['token_error']){
              this.__router.navigate(['/login'])
              localStorage.clear()
        }
        else{
      this.bussiness_type = data
     //console.log("*/-*/*/*/*/*/*/ bussiness_type",this.bussiness_type)
     }

    });


  
   // all category 
   this._createPostService.GetAllCategory().subscribe(
      data=>{
         if(data['token_error']){
              this.__router.navigate(['/login'])
              localStorage.clear()
          }
          else{ 
          this.category_name = data;
          //console.log("/*/*/*/**/**/*/*//* all_category",this.category_name)
      }

      }
    );


 // all category 
   this._createPostService.GetAllSubcategory().subscribe(
      data=>{

          if(data['token_error']){
              this.__router.navigate(['/login'])
              localStorage.clear()
            }

           else{ 
          this.subcategory_name = data;
          //console.log("/*/*/*/**/**/*/*//* subcategory_name",this.subcategory_name)
      
        }
      }


    );


  this._profile_route.userProfile().subscribe(
  res=> { 
    // console.log("/*/*/*/*/*/*/*/*/*/* profile data",this.profile_data)
    //this.user_data=res['user_data'];
     if(res['token_error']){
              this.__router.navigate(['/login'])
              localStorage.clear()
     }
     else{ 
    this.profile_data=res//[0]['profile_data'];
     //console.log("*/*/*/*/*/*/*/*//*/*/*/ response",this.profile_data)
    this.user_data = res[0]['user_data'];
    // console.log("*/*/**/*/*/*/*/*/*/user_data",this.profile_data)
    //this.bussiness_type = res['bussiness_type'];



    this.setProfileForm();
    //console.log("*/*/*/*//*/*/*/*/ form value",this.profileForm.value)
    this.setUpdatePasswordForm();
    this.profileStatus();
    this.profile_status = localStorage.getItem('profile_status')  
    //console.log("/*/*//*/*/*/*/*/*/",this.profile_status)  


  }


  },

    err =>{ console.log("sdfdsfsdfsdffsdf",err);
    }

)




this._profile_route.getPosition().then(pos=>
  {
     //console.log(`Positon: ${pos.lng} ${pos.lat}`);
  });

} 




setProfileForm(){
  this.profileForm.setValue({

   //UserProfileFormData
   bussiness_category: this.profile_data[0]['profile_data']['bussiness_type_id'],
   category_s:this.profile_data[0]['profile_data']['category_id'],
   subcategory_s:this.profile_data[0]['profile_data']['subcategory_id'],
    user_conatct: this.profile_data[0]['profile_data']['user_conatct'],
        country: this.profile_data[0]['profile_data']['country'],
        state: this.profile_data[0]['profile_data']['state'],
        city: this.profile_data[0]['profile_data']['city'],
        zip_code: this.profile_data[0]['profile_data']['zip_code'],
        detail_address: this.profile_data[0]['profile_data']['detail_address'],
  });

}


profileStatus(){
  localStorage.setItem("profile_status",this.profile_data['profile_status'])

}


getCategory(categoryTypeId: number){
 //console.log("/*/*/*/*/*/*/*/*/*/*/*/ category block",this.bussiness_type)
    if (categoryTypeId) {
      //console.log("*/*/*/*/*/*/*/*",categoryTypeId)
      this._createPostService.GetCategory(categoryTypeId).subscribe(
        data => {
           if(data['token_error']){
              this.__router.navigate(['/login'])
              localStorage.clear()
            }
            else{

          this.category_name = data;

          this.subcategory_name = null;
        }
      }
    );

    } else {
      this.category_name = null;
      this.subcategory_name = null;
    }
    // this.spinner.hide();

}

getSubcategory(categoryId:number){
  //console.log("*/*/*/*/*/*/*/*/*/ category_in sub",this.category_name)
  this.spinner.show();
  if(categoryId){
    this._createPostService.GetSubCategory(categoryId).subscribe(
        data=>{
           if(data['token_error']){
              this.__router.navigate(['/login'])
              localStorage.clear()
            }
          else{

          this.subcategory_name=data;
         
        }

      }

     );
  }
  else{
      this.subcategory_name=null;
  }
      this.spinner.hide();
}


setUpdatePasswordForm(){
  this.spinner.show()
  this.updatePasswordForm.setValue({
    password: "dsfdsfsdfdsf",
    confirm_password:"dsfsdfsdfsdfsdf",

  })
  this.spinner.hide()
}


onUpdate(){
  this.spinner.show()

    this._profile_route.updateUserProfile(this.profileForm.value).subscribe(
      res=>{

           if(res['token_error']){
              this.__router.navigate(['/login'])
              localStorage.clear()
            }
       else{
          this.susscess = res
          //console.log("*/*/*/*/*/*/*********",res);
        this.spinner.hide();
      }

    },
      err=>{
        this.error = err
        this.spinner.hide()
        //console.log(err)
      }

    )
 
  }



onPasswordUpdate(){
    this.spinner.show()
    this._profile_route.updatePassword(this.updatePasswordForm.value).subscribe(
      res=>{
         if(res['token_error']){
              this.__router.navigate(['/login'])
              localStorage.clear()
         }
         else{
        this.spinner.hide()
        ///console.log(this.updatePasswordForm.value);
      
        }
      },
      err=>{
        //console.log(err)
        //console.log(this.updatePasswordForm.value);
      }

    )
}




}

