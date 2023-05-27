import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EditProfileService } from './edit-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../model/user.model';

@Component({
	selector: 'app-edit-profile',
	templateUrl: './edit-profile.component.html',
	styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

	showLoader: boolean = false;
	isReadonly: boolean = true;
	posts: any[] = [];
	stats: any ={};
	image="https://firebasestorage.googleapis.com/v0/b/socialmediaapp-edf02.appspot.com/o/images%2Fpexels-angelo-bertini-16780574.jpg?alt=media&token=2f2210ea-3985-45f2-82ff-6dab990e2812"


	constructor(
		private auth: AuthService,
		private editProfileService: EditProfileService,
		private route: ActivatedRoute,
		public user: User,
		private router: Router
	) { };

	ngOnInit(): void {
		let id = this.route.snapshot.paramMap.get('id');

		if (id != null){
			this.getUserByID(id);
		}
			

		console.log(id);
	}

	getUserByID(id: string) {
		this.user = new User();
		this.showLoader = true;
		this.editProfileService.getUserByID(id).then(res => {
			console.log(res)
			this.user.id = res.id;
			this.user.Data = res.data();
			this.stats['Followers']=this.user.Data?.Followers;
			this.stats['Following']=this.user.Data?.Following?.length;
			this.getPosts();
			this.showLoader = false;
		}, err => {
			this.router.navigate(['error-page']);
		});
	}

	save(user: User) {
		console.log(user)
		this.editProfileService.saveUser(user);
		this.editProfileService.getUserByID(user.id);
		this.isReadonly = true;
	}

	onCancelClick(){
		this.isReadonly = true;
	}

	async upload(event: any) {
		let path = event.target.files[0];
		this.user.Data.photoUrl = await this.auth.uploadImage(path, this.user.id)
	}
	onEditClick(event: any) {
		this.isReadonly = false;
	}

	getPosts(){
		this.editProfileService.getPosts([this.user.id]).then(res => {
			this.posts = res;
			this.stats['Posts'] =this.posts.length;
			
			console.log(this.stats)
			console.log(this.posts)
		},err => {
      		alert(err)
		})

	}
	onPostClick($event: any,post: any){
		this.router.navigate(['/view-post',post.ID])
	}
}
