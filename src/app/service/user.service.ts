import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';



@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }   

    getById(id: number) {
        return this.http.get(`/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`localhost:4200/registration`, user);
    }
   

   
}
