import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email : string = '';
  password : string = '';

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.email,this.password)
    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.auth.login(this.email,this.password);

    this.email = '';
    this.password = '';

  }
}
