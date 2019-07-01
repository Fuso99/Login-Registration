import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;

  constructor() {
  }

  ngOnInit() {

  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
  }


  today() {
    return Date.now();
  }

}
