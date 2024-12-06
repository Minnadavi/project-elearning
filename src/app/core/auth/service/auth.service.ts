import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:3000/users';

  loginUser(email: string, password: string) {
    return this.http.get(`${this.baseUrl}?email=${email}&password=${password}`); // TODO: Change to POST request
  }

  registerUser(user: any) {
    return this.http.post(this.baseUrl, user); //post request

  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl); //get
  }

  //to get registerd users by email
  getUserByEmail(email: string) {
    return this.http.get(`${this.baseUrl}?email=${email}`);
  }

  // to reset password of particular user
  resetPassword(uid: string, password: string) {
    return this.http.patch(`${this.baseUrl}/${uid}`, { password });
  }
}
