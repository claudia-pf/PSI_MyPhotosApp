import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from '../global'; 
import { Photo } from "../photo"

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient) { }

  public register(nick : String, passw : String){
    const register = global.endpoint + '/user/register';
    let data = {
      nickname:nick,
      password:passw
    };
    return this.http.post(register, data).pipe();
  }

  public login(nick : String, passw : String){
    const register = global.endpoint + '/user/login';
    let data = {
      nickname:nick,
      password:passw
    };
    return this.http.post(register, data).pipe();
  }

  public isFavoritePhoto(userId: String, photo: Photo){
    const url = global.endpoint + '/user/' + userId + '/favorite/'+ photo._id;
    return this.http.get(url, this.httpOptions).pipe();
  }

  public addFavoritePhoto(userId: String, photo: Photo){
    const url = global.endpoint + '/user/' + userId + '/favorite';
    const param = JSON.stringify({"photoId": photo._id});
    return this.http.post(url, param, this.httpOptions).pipe();
  }

  public removeFavoritePhoto(userId: String, photo: Photo){
    const url = global.endpoint + '/user/' + userId + '/favorite/' + photo._id;
    return this.http.delete(url, this.httpOptions).pipe();
  }

}
