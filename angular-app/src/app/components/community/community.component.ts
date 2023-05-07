import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommunityService } from './community.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent {
  usersList: any[] = [];

  constructor(private auth: AuthService, private communityService: CommunityService, private router: Router) { };

  ngOnInit(): void {
    this.communityService.getAllUsers().then(res => {
      this.usersList = res;
    }, err => {
      alert("Error occured!!");
    });
  }

  onClickMyProfile($event: any){
    this.router.navigate(['/edit-profile',localStorage.getItem('activeUser')]);
  }
}
