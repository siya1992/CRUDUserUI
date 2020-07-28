import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import { map,catchError, retry } from 'rxjs/operators';
import {UserDetails} from './UserDetails';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { } 
  private ApiUrl = 'http://dev185/CRUDUserAPI/api/User';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };

  getAllUsers(): Observable<UserDetails[]> {    
    return this.http
    .get<UserDetails[]>(this.ApiUrl+ '/GetAllUsers').pipe(map(res => res = res['UserDetails']))
  }
  getUserById(id:number):Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(this.ApiUrl+ '/GetUserById?id=' + id)
  }
  deleteUser(id:number):Observable<number> {
    return this.http.delete<number>(this.ApiUrl + '/DeleteUser?userId=' +id,this.httpOptions)
  }
  saveUser(user:UserDetails):Observable<any> {
      return this.http.post(this.ApiUrl+ '/SaveUser', user,this.httpOptions)
  }
  
  
  
}
