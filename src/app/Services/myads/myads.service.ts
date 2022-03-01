import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyadsService {

  __my_ads = environment.baseUrl+'my_ads/'

   __approoved_ads = environment.baseUrl+'approoved_ads/'

    __unapprooved_ads = environment.baseUrl+'unapprooved_ads/'
 
  __delet_ad = environment.baseUrl+'delete_ad/'
  constructor(private __myAds:HttpClient) { }



GetMyAds(){
  		return 	this.__myAds.get(this.__my_ads).pipe(
  			catchError(this.handleError)
  			);

  }
ApproovedAds(){
        return   this.__myAds.get(this.__approoved_ads).pipe(
        catchError(this.handleError)
        );
}  


UnApproovedAds(){
        return   this.__myAds.get(this.__unapprooved_ads).pipe(
        catchError(this.handleError)
        );
}  


DeleteMyAd(post_id:number){
      return   this.__myAds.get(this.__delet_ad+`${post_id}/`).pipe(
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
