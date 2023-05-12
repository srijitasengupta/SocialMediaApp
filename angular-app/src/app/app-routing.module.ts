import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FeedComponent } from './components/feed/feed.component';
import { CommunityComponent } from './components/community/community.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'my-feed',component:FeedComponent},
  {path:'community',component:CommunityComponent},
  {path: 'edit-profile/:id',component: EditProfileComponent},
  {path: 'edit-post/:id',component: EditPostComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
