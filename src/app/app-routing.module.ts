import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PgaeNotFoundComponent } from './components/pgae-not-found/pgae-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent }   from './components/home/home.component';
import { ProfileComponent }   from './components/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard }  from './auth.guard';
import { CreatepostComponent } from './components/createpost/createpost.component';
import { FileUploadModule } from 'ng2-file-upload';
import { BussinessImageComponent } from './components/bussiness-image/bussiness-image.component';
import { PostdetailComponent } from './components/postdetail/postdetail.component';
import { AllPostsComponent } from './components/all_posts/all-posts.component';
import { CategoryWiseComponent } from './components/category-wise/category-wise.component';  
import { MypostComponent } from './components/mypost/mypost.component';
import { ApproovedPostComponent } from './components/approoved-post/approoved-post.component';
import { UnapproovedPostComponent } from './components/unapprooved-post/unapprooved-post.component';
import { LostPasswordComponent } from './components/lost-password/lost-password.component';
import { VeryfyOtpComponent } from './components/veryfy-otp/veryfy-otp.component';
import { UpdatepostComponent } from './components/updatepost/updatepost.component';
const routes: Routes = [
    { path: '', redirectTo:'/home',pathMatch: 'full' },
    { path: 'home',component: HomeComponent},
    { path: 'login',component: LoginComponent },
    { path: 'profile', component:ProfileComponent,canActivate:[AuthGuard] },
    { path : 'create_post',component:CreatepostComponent,canActivate:[AuthGuard] },
    { path: 'upload_images',component: BussinessImageComponent,canActivate:[AuthGuard] },
    { path: 'postdetail/:id',component:PostdetailComponent,canActivate:[AuthGuard]},
    { path: 'category-wise/:id',component:CategoryWiseComponent },
    { path: 'all_posts',component:AllPostsComponent },
    { path: 'my_ads',component:MypostComponent,canActivate:[AuthGuard] },
    { path: 'approoved_ads',component:ApproovedPostComponent,canActivate:[AuthGuard] },
    { path: 'unapprooved_ads',component:UnapproovedPostComponent,canActivate:[AuthGuard] },
    { path: 'register',component: RegisterComponent },
    { path: 'lost-password',component:LostPasswordComponent },
    { path: 'veryfy-otp',component:VeryfyOtpComponent },
    { path: 'updatepost/:id', component:UpdatepostComponent },

    { path: '**',component: PgaeNotFoundComponent },
    


];

@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule,FileUploadModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
			LoginComponent,PgaeNotFoundComponent,RegisterComponent,
			HomeComponent,ProfileComponent,CreatepostComponent,BussinessImageComponent,
            PostdetailComponent,AllPostsComponent,ApproovedPostComponent,
            UnapproovedPostComponent,LostPasswordComponent,VeryfyOtpComponent,UpdatepostComponent,
			]