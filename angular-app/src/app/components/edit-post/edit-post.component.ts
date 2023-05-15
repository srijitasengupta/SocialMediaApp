import { Component } from '@angular/core';
import { EditPostService } from './edit-post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-edit-post',
	templateUrl: './edit-post.component.html',
	styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent {

	showResult: boolean = false;

	constructor(
		private auth: AuthService,
		private editPostService: EditPostService,
		private route: ActivatedRoute,
		public post: Post,
		private router: Router
	) { };

	ngOnInit(): void {
		let id = this.route.snapshot.paramMap.get('id');
		this.route.snapshot.paramMap.get('id')
		if (id != null && id != '0')
			this.getPostByID(id);
		else{
			this.post = new Post();
			this.showResult = true;
		}



		console.log(id);
	}

	getPostByID(id: string) {
		this.editPostService.getPostByID(id).then(res => {

			this.post.ID = res.id;
			console.log(res);
			this.post.Data = res.data();
			this.post = this.post.Data;
			this.post.ID = res.id;
			this.showResult = true;
		}, err => {
			alert("Error occured!!");
		});
	}

	save(post: Post) {
		console.log("kool",post)
		post.User = localStorage.getItem('activeUser');
		this.editPostService.savePost(post);
		this.router.navigate(['/my-feed']);
	}

	async upload(event: any) {
		let path = event.target.files[0];
		this.post.PhotoUrl = await this.auth.uploadImage(path, this.post.ID, path.name)
		console.log(this.post.PhotoUrl)
	}

	onDeleteClick(post: Post) {
		this.editPostService.deletePost(post);
		this.router.navigate(['/my-feed']);
	}

}
