import { Component, OnInit } from '@angular/core';
import { MyadsService } from '../../Services/myads/myads.service';
import { FormGroup,FormControl,Validators,FormBuilder }  from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { UpdatepostComponent }  from '../updatepost/updatepost.component';
import { UpdatepostService } from '../../Services/updatepost/updatepost.service';

@Component({
  providers:[UpdatepostComponent],
  selector: 'app-approoved-post',
  templateUrl: './approoved-post.component.html',
  styleUrls: ['./approoved-post.component.css']
})

export class ApproovedPostComponent implements OnInit {

  public my_ads; 
  public error;
  public delete_response;
  public isOn=false;
  public update_post;
  constructor(
    private __getMyAds:MyadsService,
    private __router:Router, private spinner: NgxSpinnerService,
    private _updatePostService:UpdatepostService,
  	){ }


  ngOnInit(){

this.__getMyAds.ApproovedAds().subscribe(
        data=>{ 
          if(data['token_error']){
               this.__router.navigate(['/login'])
               localStorage.clear()
           }
           else{
          this.my_ads=data["success"];
            //console.log("*/*/*/*/*/*/*/ads",this.my_ads)
           this.spinner.hide();
           }
           

        },
        err=>{
       this.error=err;
       this.spinner.hide();
        }
      ); 

  }



getPost(i){
  this.spinner.show();
  this.__router.navigate(['/postdetail',btoa(i.post_id)])
  //console.log("*/**/*///*/*///*values id is ",item.post_id)
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

getUpdateData(id: number){
  this.__router.navigate(['/updatepost', id]);
}

// getUpdateData(i){
//   this.spinner.show();
//   this.__getUpdateData.UpdateMyAd(i.post_id).subscribe(
//     data=>{

//       if(data['token_error']){
//           this.__router.navigate(['/login'])
//           localStorage.clear()
//        }
//        else{
//       this.delete_response=data;
//       this.__router.navigate(['/my_ads'])
  
//     }
    
//     }
//  );
// this.spinner.hide();

// }



}
