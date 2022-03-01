import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../Services/search/search.service';
import { FormsModule,ReactiveFormsModule,FormControl,FormGroup,Validators } from '@angular/forms';
import { debounceTime,distinctUntilChanged,switchMap } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import {merge} from "rxjs/observable/merge";
@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  results;
  result;
  public all_post;
  public search_res;
  searchForm: FormGroup;
  constructor(private _search:SearchService,
 private spinner: NgxSpinnerService,private __router:Router,
    ) {

this.searchForm = new FormGroup({
  material : new FormControl('',Validators.required),
  lenght: new FormControl('',Validators.required),
  width: new FormControl('',Validators.required),
  weight:new FormControl('',Validators.required),
  thickness:new FormControl('',Validators.required),
  sid : new FormControl('',Validators.required),
  dimeter : new FormControl('',Validators.required),

});
    }

ngOnInit() { 
this.all_post = JSON.parse(localStorage.getItem('all_posts'))

};



public searchPost(){
  this.spinner.show();

  const formValues = this.searchForm.value; 
  const formKeys = Object.keys(formValues);
if(formKeys.length){
    for(let i = 0; i < formKeys.length; i++){
      if(formValues[formKeys[i]] === null || formValues[formKeys[i]] === ''){
         delete formValues[formKeys[i]];
       }
     }
   }

console.log('Result', formValues);

  console.log(this.searchForm.value)
  this._search.searchResult(formValues).subscribe(
      data=>{
      this.search_res=data;
      if(this.search_res){
  
        localStorage.setItem('search',JSON.stringify(this.search_res));
        this.all_post = data;
            
      }
      else if(this.search_res['token_error']){
          localStorage.clear();
          this.__router.navigate(['/login'])
    }
    else {
      localStorage.clear();

    }
  }
  
  );
this.spinner.hide();

 }



getDetails(item){
  this.spinner.show();
  this.__router.navigate(['/postdetail',btoa(item.post_id)]);
  this.spinner.hide();

}

}
@Pipe({
	name: 'filter',
})
export class FilterPipe implements PipeTransform {
	transform(items: any[], value: string, prop: string): any[] {
		if (!items) return [];
		if (!value) return items;
		return items.filter(singleItem =>
		singleItem[prop].toLowerCase().startsWith(value.toLowerCase())
		);
	}
}
