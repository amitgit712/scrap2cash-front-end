import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { DisplayService } from '../../Services/display/display.service';
import { SearchService } from '../../Services/search/search.service';
import { FormsModule,ReactiveFormsModule,FormControl } from '@angular/forms';
import { debounceTime,distinctUntilChanged,switchMap } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-category-wise',
  templateUrl: './category-wise.component.html',
  styleUrls: ['./category-wise.component.css']
})
export class CategoryWiseComponent implements OnInit {
  public category_id;
  public cat_wise;
  results;
  queryField: FormControl = new FormControl();
  constructor(private __route:ActivatedRoute,
    private _displayService:DisplayService,
    private _search:SearchService,
    private spinner: NgxSpinnerService,
    private __router:Router
    ) { }

  ngOnInit(): void {
    this.spinner.show()
    let id = parseInt(atob(this.__route.snapshot.paramMap.get('id')) );
    this.category_id = id;
    this._displayService.categorywisePost(this.category_id).subscribe(

      res=>{

        this.cat_wise = res;
        this.spinner.hide()
        console.log("*/*/*/*/*//*/ categorywise",res)
      });

this.spinner.show()
this.queryField.valueChanges
    .pipe(debounceTime(200),
      distinctUntilChanged(),
      switchMap((query) =>  this._search.searchResult(query)) )
      .subscribe( 
      result => { this.cat_wise = result;  
        this.spinner.hide()
      console.log("*/*/*/*/*/*/*/",this.cat_wise);
  });




  }

getDetails(item){

  this.__router.navigate(['/postdetail',btoa(item.post_id)])
  // console.log("*/**/*///*/*///*values id is ",item.post_id)
  this.spinner.hide();
}

}
