import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email : string = '';
  password : string = '';
  confirmPassword : string = '';
  name: string = '';
  dob: any ;
  path : any;
  showLoader: boolean = false;

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  register() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    if(this.password != this.confirmPassword) {
      alert('Please enter same Password');
      return;
    }

    this.auth.register(this.email,this.password, this.path, this.dob,this.name);
    this.showLoader = true;
    this.email = '';
    this.password = '';

  }

  upload(event: any) {
    this.path = event.target.files[0];
  }

  // uploadImage() {
  //   console.log(this.path);
  //   this.auth.uploadImage(this.path);
  // }
}
