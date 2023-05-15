import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FeedService } from './feed.service';
import { User } from 'src/app/model/user.model';
import { EditProfileService } from '../edit-profile/edit-profile.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-feed',
	templateUrl: './feed.component.html',
	styleUrls: ['./feed.component.css']
})
export class FeedComponent {

	postsList: any[] = [];
	userList: any[] =[];
	id: any;
	constructor(
		private auth: AuthService,
		private feedService: FeedService,
		private editProfileService: EditProfileService,
		public user: User,
		private router: Router

		) { };

	ngOnInit(): void {


		 this.id = localStorage.getItem('activeUser')?.toString();

		if(this.id!=null)
		this.getUserByID(this.id);

		setTimeout(() => {
			this.getPosts();
		}, 1000);

	}

	getUserByID(id: string){
		this.editProfileService.getUserByID(id).then(res => {

		  this.user.id = res.id;
		  this.user.Data = res.data();
		  console.log(this.user.Data.Following)
		  this.userList=[...this.user.Data.Following];


		}, err => {
		  alert("Error occured!!");
		});
	  }

	getPosts(){

		this.userList.push(this.id);
		console.log(this.userList)
		this.feedService.getPosts(this.userList).then(res => {
			this.postsList = res;
			console.log(this.postsList)
		},err => {
			alert("error occured")
		})

	}
	onCLickCreatePost(){
		this.router.navigate(['/edit-post','0'])
	}

	onCLickEditPost(post: any){
		this.router.navigate(['/edit-post', post.ID])
	}

  onCLickViewPost(post: any){
    this.router.navigate(['/view-post', post.ID])
  }

}
