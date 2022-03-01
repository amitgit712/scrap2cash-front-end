import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
 
export class UpdatepostService {
	_formAttrrUrl = environment.baseUrl+'send_form_attributes/'
   _category = environment.baseUrl+'get_category/'
   _subcategory = environment.baseUrl+'get_subcategory/'
   _material = environment.baseUrl+'get_material/'
   _shape = environment.baseUrl+'get_shape/'
   _submaterial = environment.baseUrl+'get_submaterial/'
   _producttype = environment.baseUrl+'get_producttype/' 
    _getformdata = environment.baseUrl+'get_formdata/'
    _getsellerInfo = environment.baseUrl+'add_seller_info/'
    __postForm = environment.baseUrl+'create_post/'
    __updatePostForm = environment.baseUrl+'update-post/'
    __updateFiles  = environment.baseUrl+'update_files/'
    __postFILES = environment.baseUrl+'upload_files/'
    __all_category = environment.baseUrl+'all_category/'
  __getPostData = environment.baseUrl+'get-post-data/'
    __all_subcategory = environment.baseUrl+'all_subcategory/'
    __getunits = environment.baseUrl+'get_unit/'
  constructor(private __updatePost:HttpClient,
    private httpClient: HttpClient) { }
GetCategoryType(){
      return   this.__updatePost.get(this._formAttrrUrl).pipe(
        catchError(this.handleError)
 
        );
  }
  GetUnits(){
    return this.__updatePost.get(this.__getunits).pipe(
      catchError(this.handleError)
    );
  }
  GetCategory(categoryTypeId:number){
      return   this.__updatePost.get(this._category+`${categoryTypeId}/`).pipe(
          catchError(this.handleError)
        );
  }


  GetAllCategory(){
      return   this.__updatePost.get(this.__all_category).pipe(
          catchError(this.handleError)
        );
  }

GetAllSubcategory(){

  return this.__updatePost.get(this.__all_subcategory).pipe(

      catchError(this.handleError)
    );
}

  GetSubCategory(categoryId:number){
      return   this.__updatePost.get(this._subcategory+`${categoryId}/`).pipe(
          catchError(this.handleError)
        );
  }

  get_material(){
    return this.__updatePost.get(this._material).pipe(
      catchError(this.handleError)
    );
  }
  get_shape(){
    return this.__updatePost.get(this._shape).pipe(
      catchError(this.handleError)
    );
  }



  GetSubMaterial(materialId:number){
      return   this.__updatePost.get(this._submaterial+`${materialId}/`).pipe(
          catchError(this.handleError)
        );
  }

  GetProductType(){
      return   this.__updatePost.get(this. _producttype).pipe(
          catchError(this.handleError)
        );
  }

  GetMaterial(){
      return   this.__updatePost.get(this. _material).pipe(
          catchError(this.handleError)
        );
  }
getPostData(id){
  return this.__updatePost.get(this. __getPostData+`${id}/`).pipe(
    catchError(this.handleError)
    );
}

GetPostForm(categoryTypeId){
      return   this.__updatePost.get(this. _getformdata+`${categoryTypeId}/`).pipe(
          catchError(this.handleError)
        );
  }

GetSellerInfo(){
  return this.__updatePost.get(this._getsellerInfo).pipe(
        catchError(this.handleError)
    )
}

updatePost(id,form_data){
  return this.__updatePost.post<any>(this.__updatePostForm+`${id}/`,form_data).pipe(
       catchError(this.handleError)
    )
}



UploadFiles(data){
  return this.__updatePost.post(this.__postFILES,data).pipe(
       catchError(this.handleError)
    );
}
UpdateFiles(id,data){
  return this.__updatePost.post(this.__updateFiles+`${id}/`,data).pipe(
    catchError(this.handleError)
 );
}




 private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }


}
