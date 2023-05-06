import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {

  usersList : any[] = [];

  constructor(private auth : AuthService ) {};

  ngOnInit() : void {
    this.auth.getAllUsers();
  }
}
