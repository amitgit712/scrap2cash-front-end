import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { UpdatepostService } from '../../Services/updatepost/updatepost.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormGroup,FormControl,Validators,FormBuilder }  from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-updatepost',
  templateUrl: './updatepost.component.html',
  styleUrls: ['./updatepost.component.css']
})
 

 
export class UpdatepostComponent implements OnInit {
  updatePostForm: FormGroup;
  productType={};
  allMaterial={};
  allShapes={};
  allUnits={};
  post_response={};
  public post_error;
  public sub_material_name;
  public  postData;
  public updateData;
  constructor(private _updatePostService:UpdatepostService, 
    private __router:Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
    ) {


this.updatePostForm = new FormGroup({
            select_product_type: new FormControl('',Validators.required),
            material : new FormControl(''),
            req_material : new FormControl(''),
            grade : new FormControl(''),
            req_grade : new FormControl(''),
            shape : new FormControl(''),
            req_shape : new FormControl(''),
            length: new FormControl(''),
            width: new FormControl(''),
            weight:new FormControl(''),
            thickness:new FormControl(''),
            quantity: new FormControl(''),
            ids : new FormControl(''),
            dimeter : new FormControl(''),
            unit  : new FormControl(''),
            product_description: new FormControl('',Validators.required),
            bargening: new FormControl(''),
            selling_price:new FormControl('',Validators.required),

      });
   }
      
  ngOnInit(){
    this.spinner.show();
    this._updatePostService.GetProductType().subscribe(
          res=>{
            if(res['token_error']){
               this.__router.navigate(['/login'])
            }
            else{
          this.productType =res;
          }       
        }
        );
   this._updatePostService.get_material().subscribe(
    res=>{
      if(res['token_error']){

        this.__router.navigate(['/login'])
      }
      else{
        this.allMaterial = res;
      }
    }
  );

  this._updatePostService.GetUnits().subscribe(
    res=>{
      if(res['token_error']){

        this.__router.navigate(['/login'])
      }
      else{
        this.allUnits = res;
      }
    }
  );

  this.route.paramMap.subscribe(params =>{
    const id = +params.get('id');
    if(id){
      this.getPostData(id);
    }
  })

  this._updatePostService.get_shape().subscribe(
    res=>{
      if(res['token_error']){

        this.__router.navigate(['/login'])
      }
      else{
        this.allShapes = res;
      }
    }
  );
    this.spinner.hide();
};

 

public UpdateForm(id){
  this.spinner.show();
  this._updatePostService.updatePost(id,this.updatePostForm.value).subscribe(
      data=>{
      this.post_response=data;
      if(this.post_response['error']){

               this.post_error = "some error";
           
          this.__router.navigate(['/login'])
      }        
      else if(this.post_response['token_error']){
          localStorage.clear();

          this.__router.navigate(['/login'])
    }
    else {

      localStorage.setItem('postData',JSON.stringify(this.post_response));

    }
  }
  
  );
this.spinner.hide();

 }

selectedType = 'optionValue';

  onChange(event) {
    this.selectedType = event.target.value;

  }


getGrade(materialId:number){
  this.spinner.show();
  if(materialId){
    this._updatePostService.GetSubMaterial(materialId).subscribe(
        data=>{
           if(data['token_error']){
              this.__router.navigate(['/login'])
              localStorage.clear()
            }
          else{
          this.sub_material_name=data;
         
        }

      }

     );
  }
  else{
      this.sub_material_name=null;
  }
      this.spinner.hide();
}

getPostData(id: number){
  if (id){
  this._updatePostService.getPostData(id).subscribe(
    data => {
    if (data['token_error']) {
      this.__router.navigate(['/login'])
      localStorage.clear()
    }
    else{
      console.log('////////data///////',data[0])
      this.updateData=data[0];

    }
  }
    );
 }


}



selectType = 'optionValue';

onSelect(event){
    this.selectType = event.target.value;
}

selectShape = 'optionValue';

onSelecthsape(event){
    this.selectShape = event.target.value;
}

// text = "somthing";
// onChangehsape(event){
//     this.text = event.target.options[event.target.options.selectedIndex].text;
// }


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
  

 updateFiles(id) {
     this.spinner.show();
      this._updatePostService.UpdateFiles(id,this.fd).subscribe(
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


}



