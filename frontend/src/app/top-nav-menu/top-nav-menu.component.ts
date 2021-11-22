import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav-menu',
  templateUrl: './top-nav-menu.component.html',
  styleUrls: ['./top-nav-menu.component.css']
})
export class TopNavMenuComponent implements OnInit {
  
  isLoggedIn : boolean = false;
  constructor(private router:Router) {
  }

  ngOnInit(): void {
    if(localStorage.getItem("myPhotos_id")){
      this.isLoggedIn = true;
    }

  }

  logOut(): void{
    localStorage.removeItem("myPhotos_id");
    location.reload();
  }

}
