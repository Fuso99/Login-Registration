import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../../user';
import {Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }


  user: any[];

  getUser()   {
    console.log('test call');
    const url = 'http://localhost:8080/profilo';
    console.log(
      this.http.get<Observable<boolean>>(url, {
      }
      ).subscribe(isValid => {
            console.log(isValid);
                   }, error1 => console.log(error1)
    ));
    return this.http.get<any[]>('http://localhost:8080/profilo');
  }

  getById(id: number) {
    return this.http.get(`/users/${id}`);
  }

  register(user: User) {
    console.log(user);
    console.log(    this.http.post(`localhost:8080/registrati`, user)
    );
    return this.http.post(`localhost:8080/registrati`, user);
  }


}
