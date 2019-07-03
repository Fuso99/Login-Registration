import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../user';
import {map} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  model: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
  }

  login(mod) {
    this.model = mod;
    const url = 'http://localhost:8080/login';
    const params = new HttpParams()
      .set('username', this.model.username)
      .set('password', this.model.password);
    this.http.post<Observable<boolean>>(url, {
      username: this.model.username,
      password: this.model.password
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        withCredentials: 'true',
      },
      'responseType': 'html',
      params
    }).subscribe(isValid => {
        if (isValid) {
          this.authenticate(this.model.username, this.model.password);
          sessionStorage.setItem('token', btoa(this.model.username + ':' + this.model.password));
          this.router.navigateByUrl('profile');
        } else {
          alert('Authentication failed.');
        }
      }, error1 => console.log(error1),
      () => console.log('complete login ' + params.get('username'))
    );
  }

  authenticate(username, password) {
    const headers = new HttpHeaders({Authorization: 'Basic ' + btoa(username + ':' + password)});
    return this.http.get<User>('localhost:8080/profile', {headers}).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          return userData;
        }
      )
    );
  }


  isUserLoggedIn() {
    const user = this.model.username;
    // console.log(user)
    console.log('#################################################' + sessionStorage.getItem('token'))
    return !(user === undefined);
  }

  logOut() {
    sessionStorage.removeItem('username');
  }
}
