import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule ,routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent }   from './components/home/home.component';
import { LoginComponent }   from './components/login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from './Services/register/register.service';
import { LoginService } from './Services/login/login.service';
import { AuthGuard }   from './auth.guard';
import  { TokenInterceptorService } from './Services/token/token-interceptor.service';
import { ProfileComponent } from './components/profile/profile.component';
import { CreatepostComponent } from './components/createpost/createpost.component';
import { BussinessImageComponent } from './components/bussiness-image/bussiness-image.component';
import { PostdetailComponent } from './components/postdetail/postdetail.component';
import { AllPostsComponent } from './components/all_posts/all-posts.component';
import { CategoryWiseComponent } from './components/category-wise/category-wise.component';
import { SearchService } from './Services/search/search.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { MypostComponent } from './components/mypost/mypost.component';
import { ApproovedPostComponent } from './components/approoved-post/approoved-post.component';
import { UnapproovedPostComponent } from './components/unapprooved-post/unapprooved-post.component';
import { LostPasswordComponent } from './components/lost-password/lost-password.component';
import { VeryfyOtpComponent } from './components/veryfy-otp/veryfy-otp.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdatepostComponent } from './components/updatepost/updatepost.component';

//import { DragDropDirective } from './components/bussiness-image/drag-drop.directive';

@NgModule({ 
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    CreatepostComponent,
    BussinessImageComponent, 
    HomeComponent, PostdetailComponent,
    AllPostsComponent, CategoryWiseComponent,
    MypostComponent, ApproovedPostComponent, 
    UnapproovedPostComponent, 
    LostPasswordComponent, VeryfyOtpComponent, UpdatepostComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [LoginService,AuthGuard,SearchService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
