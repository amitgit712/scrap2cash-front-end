import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../../Services/display/display.service';
import { Router } from '@angular/router';
import { SearchService } from '../../Services/search/search.service';
import { FormsModule,ReactiveFormsModule,FormControl } from '@angular/forms';
import { debounceTime,distinctUntilChanged,switchMap } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  AllScrapData={};

  constructor(private __displayService:DisplayService,
    private __router:Router,private _search:SearchService,
    private spinner: NgxSpinnerService 
    ) { }
  
  category;
  queryField: FormControl = new FormControl();
  // public recently_added;
  recently_added; 
  search;

  ngOnInit(){

    this.spinner.show();
    this.__displayService.getCategories().subscribe(  
      res=>{
        if(res['token_error']){
               this.__router.navigate(['/login'])
               localStorage.clear()
         }
         else{
        this.category = res;
        this.spinner.hide();      
        // console.log("/*/*/*/*//*/",res)
        }
        
      });

    this.spinner.show();
    this.__displayService.getRecentPost().subscribe(
      res=>{
        this.recently_added=res
         //console.log("*/*/*/*/*/*/*/",this.recently_added)
         localStorage.setItem("all_posts", JSON.stringify(this.recently_added));
         this.spinner.hide();
        
      }

      );

      this.__displayService.getScrapData().subscribe(
        res=>{
          if(res){
            this.AllScrapData = res;
            console.log("asdfsadsad",res)
          }
          else{
            console.log("ERROR",res)
            
          }
        }
      );
    

this.spinner.show();
this.queryField.valueChanges
    .pipe(debounceTime(200),
      distinctUntilChanged(),
      switchMap((query) =>  this._search.searchResult(query)) )
      .subscribe( 
      result => { 
        this.recently_added = result;
       this.spinner.hide();

      //console.log("*/*/*/*/*/*/*/",this.recently_added);
  });


  // this.spinner.hide();

  } 



getPost(item){
  this.spinner.show();
  this.__router.navigate(['/postdetail',btoa(item.post_id)])
  // console.log("*/**/*///*/*///*values id is ",item.post_id)
  this.spinner.hide();
}

getCategoryData(item){
  this.spinner.show();
  this.__router.navigate(['/category-wise',btoa(item.id)])
  this.spinner.hide();
}

}

