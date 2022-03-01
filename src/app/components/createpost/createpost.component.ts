import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CreatepostService } from '../../Services/createpost/createpost.service';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators,FormBuilder }  from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})  
 
export class CreatepostComponent implements OnInit {
  createPostForm: FormGroup;
  productType={};
  allMaterial={};
  allShapes={};
  allUnits={};
  post_response={};
  public post_error;
  public sub_material_name;
  constructor(private _createPostService:CreatepostService, 
    private __router:Router, private spinner: NgxSpinnerService
    ) {


this.createPostForm = new FormGroup({
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
            unit: new FormControl(''),
            ids : new FormControl(''),
            dimeter : new FormControl(''),
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
            }
            else{
          this.productType =res;
          }       
        }
        );

   this._createPostService.get_material().subscribe(
    res=>{
      if(res['token_error']){

        this.__router.navigate(['/login'])
      }
      else{
        this.allMaterial = res;
      }
    }
  );

  this._createPostService.GetUnits().subscribe(
    res=>{
      if(res['token_error']){

        this.__router.navigate(['/login'])
      }
      else{
        this.allUnits = res;
      }
    }
  );
  

  this._createPostService.get_shape().subscribe(
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



public createPost(){
  this.spinner.show();
  this._createPostService.CreatePost(this.createPostForm.value).subscribe(
      data=>{
      this.post_response=data;
      if(this.post_response['error']){

               this.post_error = "Kindly complete your bussiness profile";
           
      }
      else if(this.post_response['token_error']){
          localStorage.clear();
          this.__router.navigate(['/login'])
    }
    else {


      localStorage.setItem('postData',JSON.stringify(this.post_response));
      this.__router.navigate(['/upload_images']);

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
    this._createPostService.GetSubMaterial(materialId).subscribe(
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

}



