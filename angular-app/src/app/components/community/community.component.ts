import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommunityService } from './community.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent {
  usersList: any[] = [];

  constructor(private auth: AuthService, private communityService: CommunityService) { };

  ngOnInit(): void {
    this.communityService.getAllUsers().then(res => {
      this.usersList = res;
    }, err => {
      alert("Error occured!!");
    });
  }
}
