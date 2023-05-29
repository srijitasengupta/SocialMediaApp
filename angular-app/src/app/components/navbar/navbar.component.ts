import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../model/user.model';
import { EditProfileService } from '../edit-profile/edit-profile.service';
import { Post } from 'src/app/model/post.model';
import { EditPostService } from '../edit-post/edit-post.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

	@Input() currentUser: any;
	visible: boolean = false;
	parentElement: any;

	constructor(
		private auth: AuthService,
		private editProfileService: EditProfileService,
		private route: ActivatedRoute,
		public user: User,
		private router: Router,
		private elementRef: ElementRef, 
		private renderer: Renderer2,
		public post: Post,
		private editPostService: EditPostService,
		
	) { };

	ngOnInit(): void {

		if (this.currentUser != null)
			this.user = this.currentUser;

		else {
			let id = this.route.snapshot.paramMap.get('id');
			if (id != null)
				this.getUserByID(id);
		}

	}

	ngAfterViewInit() {
		this.parentElement = this.elementRef.nativeElement.querySelector('.parent-content') as HTMLElement;
	  }

	getUserByID(id: string) {
		this.editProfileService.getUserByID(id).then(res => {
			this.user = new User();
			this.user.id = res.id;
			this.user.Data = res.data();
		}, err => {
			this.router.navigate(['error-page'])
		});
	}

	showDialog(event: Event){
		this.parentElement.classList.add('dialog-clicked');
		this.post = new Post();
		this.visible = true;
	}
	closeDialog(){
		this.parentElement.classList.remove('dialog-clicked');
		this.visible = false;
	}

	onPostCreation(event: any){
		this.closeDialog();
	}
	

}
