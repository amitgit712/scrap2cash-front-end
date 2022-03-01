import { Component, OnInit } from '@angular/core';
import { MyadsService } from '../../Services/myads/myads.service';
import { FormGroup,FormControl,Validators,FormBuilder }  from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { CreatepostService } from '../../Services/createpost/createpost.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unapprooved-post',
  templateUrl: './unapprooved-post.component.html',
  styleUrls: ['./unapprooved-post.component.css']
})
export class UnapproovedPostComponent implements OnInit {

  public my_ads; 
  public error;
  public delete_response;
  constructor(private __getMyAds:MyadsService,
    private __router:Router, private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {



this.__getMyAds.UnApproovedAds().subscribe(
        data=>{
        if(data['token_error']){
          this.__router.navigate(['/login'])
              localStorage.clear()
        } 
        else{
          this.my_ads=data["success"];
            // console.log("*/*/*/*/*/*/*/unaads",this.my_ads)
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

getUpdateData(id: number){
  this.__router.navigate(['/updatepost', id]);
}

}
