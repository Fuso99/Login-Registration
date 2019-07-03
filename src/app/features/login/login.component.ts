import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../service/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authserv: AuthenticationService
  ) {

  }

  ngOnInit() {}
  login() {
    this.authserv.login(this.model);
  }

}
