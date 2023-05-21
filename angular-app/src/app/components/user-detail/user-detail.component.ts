import { Component, Input } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetailService } from '../user-detail.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  @Input() user: any;
  userId: string = '';

  constructor(
    private auth: AuthService,
    private userDetailService: UserDetailService,
    private route: ActivatedRoute,
    public curentUser: User,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.user) {
      console.log("ssssssss", this.user?.Data);
    }
    this.userId = localStorage.getItem('activeUser') as string;
    if (this.userId) {
      this.getCurrentUserByID(this.userId);
    }

  }

  getCurrentUserByID(id: string) {
    this.userDetailService.getUserByID(id).then(res => {
      this.curentUser.id = res.id;
      this.curentUser.Data = res.data();
    }, err => {
      this.router.navigate(['error-page'])
    });
  }

  getIsFollowing() {
    for (let id of this.curentUser?.Data?.Following || []) {
      if (id == this.user?.id) {
        return true;
      }
    }
    return false;
  }

  toggleFollow() {
    if (this.getIsFollowing()) {
      const index = this.curentUser?.Data?.Following.indexOf(this.user.id);

      if (index !== -1) {
        this.curentUser?.Data?.Following.splice(index, 1);
        this.user.Data.Followers -= 1;
      }
    }
    else {
      this.curentUser?.Data?.Following.push(this.user.id);
      this.user.Data.Followers += 1;
    }
    this.userDetailService.saveUser(this.curentUser);
    this.userDetailService.saveUser(this.user);
  }

}
