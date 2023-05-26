import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../model/user.model';
import { EditProfileService } from '../edit-profile/edit-profile.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

	@Input() currentUser: any;

	constructor(
		private auth: AuthService,
		private editProfileService: EditProfileService,
		private route: ActivatedRoute,
		public user: User,
		private router: Router
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

	getUserByID(id: string) {
		this.editProfileService.getUserByID(id).then(res => {
			this.user = new User();
			this.user.id = res.id;
			this.user.Data = res.data();
		}, err => {
			this.router.navigate(['error-page'])
		});
	}

}
