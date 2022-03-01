import { Component, OnInit } from '@angular/core';
import { MyadsService } from '../../Services/myads/myads.service';
import { FormGroup,FormControl,Validators,FormBuilder }  from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { CreatepostService } from '../../Services/createpost/createpost.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mypost',
  templateUrl: './mypost.component.html',
  styleUrls: ['./mypost.component.css']
})
export class MypostComponent implements OnInit {

  public my_ads; 
  public error;
  public delete_response;
  public productType;
    editPostForm: FormGroup;

  constructor(
      private __getMyAds:MyadsService,
      private _createPostService:CreatepostService, 
    private __router:Router, private spinner: NgxSpinnerService
    ) { 



this.editPostForm = new FormGroup({
            select_product_type: new FormControl('',Validators.required),
            product_name: new FormControl('',Validators.required),
            length: new FormControl(''),
            width: new FormControl(''),
            weight:new FormControl(''),
            quantity: new FormControl(''),
            product_description: new FormControl('',Validators.required),
            bargening: new FormControl(''),
            selling_price:new FormControl('',Validators.required),

      });
   } 

 

  ngOnInit(){
   this.spinner.show();
   this._createPostService.GetProductType().subscribe(
          res=>{
             if(res['token_error']){
        this.__router.navigate(['/login'])
              localStorage.clear()
      }
      else{
          this.productType =res;  

              this.spinner.hide();
        }
        }
        );

      this.__getMyAds.GetMyAds().subscribe(
        data=>{ 
          if(data['error']){
            this.__router.navigate(['/login'])
            localStorage.clear()
          }
          else{
          this.my_ads=data["success"];
            this.spinner.hide();
          }
        },
        err=>{ 
       this.error=err;
       this.spinner.hide();
        }
      ); 

}

setPostForm(){
//console.log("/*/*/*/*/*/*/*/*/*/*/*/ profile block",this.bussiness_type)
  this.editPostForm.setValue({

   //UserProfileFormData
   select_product_type: this.my_ads['product_type'],
   product_name:this.my_ads['product_name'],
   length:this.my_ads['length'],//this.profile_data[0]['profile_data']['subcategory_id'],
    width: this.my_ads['width'],//this.profile_data[0]['profile_data']['user_conatct'],
        weight: this.my_ads['weight'],//this.profile_data[0]['profile_data']['country'],
        quantity: this.my_ads['quantity'],//this.profile_data[0]['profile_data']['state'],
        product_description: this.my_ads['product_detail'],//this.profile_data[0]['profile_data']['city'],
        bargening: this.my_ads['bargening'],//this.profile_data[0]['profile_data']['zip_code'],
        selling_price: this.my_ads['selling_price'],//this.profile_data[0]['profile_data']['detail_address'],
  });
}



onUpdate(){
  this.spinner.show()

    // this.__getMyAds.updateUserProfile(this.profileForm.value).subscribe(
    //   res=>{

    //       this.susscess = res
    //       console.log("*/*/*/*/*/*/*********",res);
    //     this.spinner.hide()
    //   },
    //   err=>{
    //     this.error = err
    //     this.spinner.hide()
    //     //console.log(err)
    //   }

    // )
 
  }

  getUpdateData(id: number){
    this.__router.navigate(['/updatepost', id]);
  }

getPost(i){
  this.spinner.show();
  this.__router.navigate(['/postdetail',btoa(i.post_id)])
  // console.log("*/**/*///*/*///*values id is ",item.post_id)
  this.spinner.hide();
}

deletePost(i){
  this.spinner.show();
  this.__getMyAds.DeleteMyAd(i.post_id).subscribe(
    data=>{
       if(data['token_error']){
        this.__router.navigate(['/login'])
              localStorage.clear()
      }
      else{
      this.delete_response=data;
      this.__router.navigate(['/my_ads'])
    }
    }
 );
this.spinner.hide();
}


  
}
