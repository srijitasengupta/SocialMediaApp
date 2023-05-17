import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FeedComponent } from './components/feed/feed.component';
import { FormsModule } from '@angular/forms';
import {AngularFireStorageModule } from '@angular/fire/compat/storage';
import { CommunityComponent } from './components/community/community.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { User } from './model/user.model';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { Post } from './model/post.model';
import { Comment } from './model/comment.model';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { MessageModule } from 'primeng/message';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FeedComponent,
    CommunityComponent,
    EditProfileComponent,
    UserDetailComponent,
    EditPostComponent,
    ViewPostComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    DialogModule,
    BrowserAnimationsModule,
    FileUploadModule,
    HttpClientModule,
    MessageModule
  ],
  providers: [
    User,
    Post,
    Comment,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
