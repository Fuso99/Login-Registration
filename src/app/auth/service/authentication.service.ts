import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../../user';
import {delay, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  model: any = {};
  isLoggedIn = false;
  redirectUrl: String;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
  }

  login(mod): Observable<boolean> {
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
      // 'responseType': this.model,
      'responseType': 'html',
      params
    }).subscribe(isValid => {
        if (isValid) {
         // this.authenticate(this.model.username, this.model.password);
          sessionStorage.setItem('token', btoa(this.model.username + ':' + this.model.password));
          this.isLoggedIn = true;
          this.router.navigateByUrl('profile');
        } else {
          alert('Authentication failed.');
        }
      }, error1 => console.log(error1),
      () => console.log('complete login')
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
    // const user = sessionStorage.getItem('token');
    // console.log(!(user === null));
    // console.log(this.isLoggedIn)
    return (this.isLoggedIn);
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    this.isLoggedIn = false;
  }

  navigate(strings: string[]) {
    return this.redirectUrl =  `http://localhost:4200${strings}`;
  }
}
