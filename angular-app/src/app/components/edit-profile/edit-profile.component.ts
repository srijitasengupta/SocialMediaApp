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

  showResult : boolean =false;

  constructor(
    private auth: AuthService, 
    private editProfileService:EditProfileService,
    private route: ActivatedRoute,
    public user: User
    ) { };

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    
    if(id!=null)
    this.getUserByID(id);

    console.log(id);
  }

  getUserByID(id: string){
    this.editProfileService.getUserByID(id).then(res => {

      this.user.id = res.id;
      this.user.Data = res.data();
      this.showResult = true;
    }, err => {
      alert("Error occured!!");
    });
  }

  save(user: User){
    this.editProfileService.saveUser(user);
    this.editProfileService.getUserByID(user.id);
  }
  
  async upload(event: any) {
    let path = event.target.files[0];
    this.user.Data.photoUrl = await this.auth.uploadImage(path, this.user.id)
  }
}
