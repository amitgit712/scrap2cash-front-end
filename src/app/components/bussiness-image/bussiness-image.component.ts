import { Component, OnInit } from '@angular/core';
import { CreatepostService } from '../../Services/createpost/createpost.service';
import { Router }  from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-bussiness-image',
  templateUrl: './bussiness-image.component.html',
  styleUrls: ['./bussiness-image.component.css']
})
export class BussinessImageComponent implements OnInit {

  constructor(private _createPostService:CreatepostService,
  	private __router:Router,private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
   
   
  }


files: File = null;
url:any = [];
fd = new FormData();
id:any=[]
 uploadFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
    			this.files =<File>event.target.files[i]
    			this.url.push(event.target.files[i])
 	 			  this.fd.append("images",this.files,this.files.name);                                    
                 
           }
        }
    }
  

 upload() {
     this.spinner.show();
      this._createPostService.UploadFiles(this.fd).subscribe(
      		data=>{
            if(data['token_error']){
               this.__router.navigate(['/login'])
            }else{
      			this.__router.navigate(['/unapprooved_ads'])
            this.spinner.hide();
          }
      		}

      	);
    }  


skip(){
  this.spinner.show();
   
this._createPostService.UploadFiles(this.fd).subscribe(
          data=>{
              if(data['token_error']){
               this.__router.navigate(['/login'])
            }else{
          this.__router.navigate(['/unapprooved_ads'])
            this.spinner.hide();
          }
          }

        );
this.spinner.hide();

}

  }


