import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as global from '../global'; 
import { Photo } from "../photo"
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  userId: String = localStorage.getItem("myPhotos_id")!;
  constructor(private http: HttpClient) { }

  upload(photo : Photo ): Observable<Photo>{
    const path = global.endpoint + '/photos/upload/';
    console.log("upload no service");
    return this.http.post<Photo>(path, photo, this.httpOptions).pipe();
  }

  getPhotos(): Observable<any> {
    const path = global.endpoint + '/user/' + localStorage.getItem("myPhotos_id") +'/MyPhotos';
    return this.http.get(path)
      .pipe();
  }

  getPhoto(id: string){
    const path = global.endpoint + '/photos/'+id;
    return this.http.get<Photo[]>(path, this.httpOptions).pipe();
  }

  getMostRecentPhotos(): Observable<Photo[]>{
    const path = global.endpoint + '/photos/recent/';
    return this.http.get<Photo[]>(path, this.httpOptions).pipe();
    
  }

  //getFavoritePhotos(): Observable<Photo[]>{
    getFavoritePhotos(){
    const id = localStorage.getItem("myPhotos_id");
    const path = global.endpoint + '/user/'+id+'/favorite';
    //return this.http.get<Photo[]>(path, this.httpOptions).pipe();
    return this.http.get(path, this.httpOptions).pipe();
  }

  deletePhoto(photo: Photo ): Observable< Photo> {
    const id = photo._id;
    const url = global.endpoint + '/photos/'+id;
    console.log("entrei")
    return this.http.delete<Photo>(url, this.httpOptions).pipe();
  }

  likePhoto(userId: string, photo: Photo){
    const id = photo._id;
    const url = global.endpoint + '/photos/'+ id +'/like';
    const user = JSON.stringify({"userId": userId});
    return this.http.post(url, user, this.httpOptions).pipe();
  
  }

  dislikePhoto(userId: string, photo: Photo){
    const id = photo._id;
    const url = global.endpoint + '/photos/'+ id +'/dislike';
    const user = JSON.stringify({"userId": userId});
    return this.http.post(url, user, this.httpOptions).pipe();
  
  }

  getMostPopularPhotos(): Observable<Photo[]>{
    const path = global.endpoint + '/photos/popular/';
    return this.http.get<Photo[]>(path, this.httpOptions).pipe();
    
  }

}
