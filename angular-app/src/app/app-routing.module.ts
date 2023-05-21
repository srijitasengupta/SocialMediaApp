import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FeedComponent } from './components/feed/feed.component';
import { CommunityComponent } from './components/community/community.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'my-feed',component:FeedComponent},
  {path:'community',component:CommunityComponent},
  {path: 'edit-profile/:id',component: EditProfileComponent},
  {path: 'edit-post/:id',component: EditPostComponent},
  {path: 'view-post/:id',component: ViewPostComponent},
  {path: 'navbar',component: NavbarComponent},
  {path: 'error-page',component: ErrorPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
