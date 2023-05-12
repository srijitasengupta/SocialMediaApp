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
    public curentUser: User
  ) { }

  ngOnInit(): void {
    if (this.user) {
      console.log("ssssssss", this.user?.Data);
    }
    this.userId = localStorage.getItem('activeUser') as string;
    if(this.userId){
      this.getCurrentUserByID(this.userId);
    }

  }

  getCurrentUserByID(id: string) {
    this.userDetailService.getUserByID(id).then(res => {
      this.curentUser.id = res.id;
      this.curentUser.Data = res.data();
    }, err => {
      alert("Error occured!!");
    });
  }

  clickFollow() {
    this.curentUser?.Data?.Following.push(this.user.id);
    this.userDetailService.saveUser(this.curentUser);
    this.user.Data.Followers += 1;
    this.userDetailService.saveUser(this.user);
  }

  getIsFollowing() {
    for(let id of this.curentUser?.Data?.Following || []){
      if(id == this.user?.id){
        return false;
      }
    }
    return true;
  }
}
