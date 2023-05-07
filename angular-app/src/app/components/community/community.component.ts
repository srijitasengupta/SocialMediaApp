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
  constructor(private auth: AuthService, private communityService: CommunityService,private router: Router) { };

  ngOnInit(): void {
    this.usersList = [];
    this.communityService.getAllUsers().then(res => {
      this.usersList = res;
    }, err => {
      alert("Error occured!!");
    });
  }

  search() {
    this.usersList = [];
    this.communityService.getUserByName(this.searchTerm).then(res => {
      this.usersList = res;
    },err => {
      alert("error occured")
    })
  }

  onClickMyProfile($event: any){
    this.router.navigate(['/edit-profile',localStorage.getItem('activeUser')]);
  }
}
