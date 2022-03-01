import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
}) 
export class DisplayService {
	 _homeData = environment.baseUrl+'home_data/'
   _recentPost = environment.baseUrl+'recent_post/'
   _postDetail = environment.baseUrl+'post_detail/'
   _mailProductRequirements = environment.baseUrl+'mail_product_requirements/'
   _categorywisePost = environment.baseUrl+'category_wise/'
   _scrapData = environment.baseUrl+'scrapdata/'
   // _allPost = environment.baseUrl+'all_post/'
  	 constructor(private __home:HttpClient) { }


getCategories(){
	return this.__home.get(this._homeData).pipe(
		catchError(this.handleError)	
	);
}

getScrapData(){
	return this.__home.get(this._scrapData).pipe(
		catchError(this.handleError)	
	);
}


getRecentPost(){
  return this.__home.get(this._recentPost).pipe(
    catchError(this.handleError)  
  );
}

postDetail(postId){
  return this.__home.get(this._postDetail+`${postId}/`).pipe(
    catchError(this.handleError)  
  );
}

mailProductRequirements(postId){
  return this.__home.get(this._mailProductRequirements+`${postId}/`).pipe(
    catchError(this.handleError)  
  );
}

categorywisePost(catId){
  return this.__home.get(this._categorywisePost+`${catId}/`).pipe(
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









