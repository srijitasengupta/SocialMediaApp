import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommunityService } from './community.service';
import { getFirestore, collection, doc, setDoc, CollectionReference, query, where, getDocs, getDoc } from "firebase/firestore";
import { User } from 'src/app/model/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent {
  usersList: any[] = [];
  searchTerm: string = '';
  visible: boolean = false;
  user: any;
  showLoader: boolean = false;
  constructor(private auth: AuthService, private communityService: CommunityService, private router: Router) { };

  ngOnInit(): void {
    this.usersList = [];
    this.showLoader = true;
    this.communityService.getAllUsers().then(res => {
      this.usersList = res;
      this.showLoader = false;
    }, err => {
      this.router.navigate(['error-page']);
    });
  }

  search() {
    this.usersList = [];
    this.showLoader = true;
    if (this.searchTerm == '') {
      this.communityService.getAllUsers().then(res => {
        this.usersList = res;
        this.showLoader = false;
      }, err => {
        this.router.navigate(['error-page']);
      })
    }
    else {
      this.communityService.getUserByName(this.searchTerm).then(res => {
        this.usersList = res;
        this.showLoader = false;
      }, err => {
        this.router.navigate(['error-page']);
      })
    }

  }

  onKeyUp(event: any) {
    this.showLoader = true;
    this.communityService.getUserByName(this.searchTerm).then(res => {
      this.usersList = res;
      this.showLoader = false;
    }, err => {
      this.router.navigate(['error-page']);
    })
  }

  onClickMyProfile($event: any) {
    this.router.navigate(['/edit-profile', localStorage.getItem('activeUser')]);
  }

  updateCuurentUser() {
    console.log("sssss", this.user);
  }
}
