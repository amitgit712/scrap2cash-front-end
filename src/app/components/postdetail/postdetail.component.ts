import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisplayService } from '../../Services/display/display.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css']
})
export class PostdetailComponent implements OnInit {
  public post_id;
  public material;
  public post_detail;
  public category_type;
  public category;
  public subcategory;
  public user_details;
  public user_profile;
  public post_images ;
  public product_type;
  public error;
  public success;
  constructor(private __route:ActivatedRoute,private __displayService:DisplayService,
    private spinner: NgxSpinnerService, private __router:Router,
   ) { }

  ngOnInit(): void {
    let id = parseInt(atob(this.__route.snapshot.paramMap.get('id')) );
    this.post_id = id;
    this.spinner.show()
    this.__displayService.postDetail(this.post_id).subscribe(
      res=>{
            if(res['token_error']){
              this.__router.navigate(['/login'])
              localStorage.clear()
            }
            else{
            this.post_detail =res[0].post_data;
            this.material =res[0].material;
            this.category_type =res[0].category_type;
            this.category =res[0].category;
            this.subcategory =res[0].subcategory;
            this.user_details =res[0].user_details;
            this.user_profile =res[0].user_profile;
            this.post_images =res[0].images;
            this.product_type = res[0].product_type;
            this.spinner.hide()
            //console.log("*/*/*/*/*/*//*/*/*/*/",res)

          }
      });




  }

mailProductRequirements(){
  this.spinner.show()
    this.__displayService.mailProductRequirements(this.post_id).subscribe(

      res=>{
        //console.log("/*/**/*/*/*//",res)
        if(res['error']){
          this.error = res['error']
          localStorage.clear();
                  this.spinner.hide()
        }
        else{

          this.success = res['success']
                  this.spinner.hide()
        }


      }

      );

}

}
