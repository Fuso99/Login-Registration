import { Component, OnInit } from '@angular/core';
import {UserService} from '../../auth/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    js: any;
  constructor(private user: UserService) { }

  ngOnInit() {
   this.js = this.user.getUser();
  }
osid() {
  this.user.getUser();
}

}
