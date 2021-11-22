import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('myPhotos_id');
    if(token){
      return true;
    }
    return false;
  }
}
