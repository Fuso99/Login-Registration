import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {UserService} from '../../auth/service/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private regServ: UserService) {
  }

  ngOnInit() {

  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
    this.regServ.register(f.value);
  }


  today() {
    return Date.now();
  }

}
