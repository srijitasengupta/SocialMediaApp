import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FeedService } from './feed.service';
import { User } from 'src/app/model/user.model';
import { EditProfileService } from '../edit-profile/edit-profile.service';
import { Router } from '@angular/router';
import { ViewPostService } from '../view-post/view-post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {

  postsList: any[] = [];
  userList: any[] = [];
  showLoader: boolean = false;
  id: any;
  constructor(
    private auth: AuthService,
    private feedService: FeedService,
    private editProfileService: EditProfileService,
    private viewPostService: ViewPostService,
    public user: User,
    private router: Router

  ) { };

  ngOnInit(): void {


    this.id = localStorage.getItem('activeUser')?.toString();

    if (this.id != null)
      this.getUserByID(this.id);

    setTimeout(() => {
      this.getPosts();
    }, 1000);

  }

  getUserByID(id: string) {
    this.editProfileService.getUserByID(id).then(res => {

      this.user.id = res.id;
      this.user.Data = res.data();
      console.log(this.user.Data.Following)
      this.userList = [...this.user.Data.Following];


    }, err => {
      this.router.navigate(['error-page'])
    });
  }

  getPosts() {

    this.userList.push(this.id);
    console.log(this.userList)
    this.feedService.getPosts(this.userList).then(res => {
      this.postsList = res;
      console.log(this.postsList)
    }, err => {
      this.router.navigate(['error-page'])
    })

  }
  onCLickCreatePost() {
    this.router.navigate(['/edit-post', '0'])
  }

  goToViewPost(post: any) {
    this.router.navigate(['/view-post', post.ID])
  }

  toggleLike(post: any) {
    post.isLiked = !post.isLiked;
    post.Data.Likes = post.isLiked ? post.Data.Likes + 1 : post.Data.Likes - 1;

    this.showLoader = true;
    console.log(post.Data);
    this.viewPostService.updatePost(post.ID,post.Data).then(res => {
      this.showLoader = false;
    },err => {
      this.router.navigate(['error-page'])
    });
  }
}
