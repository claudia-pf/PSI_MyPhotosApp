import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ActionSequence } from 'selenium-webdriver';
import { PhotoService } from '../services/photo.service';
import { UsersService } from '../services/users.service';
import { Photo } from "../photo";
@Component({
  selector: 'app-photo-viewer-v2',
  templateUrl: './photo-viewer-v2.component.html',
  styleUrls: ['./photo-viewer-v2.component.css']
})
export class PhotoViewerV2Component implements OnInit {

  photo? :  any;
  isLoading : boolean = true;
  isFavorite : boolean = false;
  owner? : boolean = true;
  deleteClicked? : boolean = false;
  liked? : boolean = false;
  numberLikes?: number;
  login: boolean = false;


  constructor(private photoService : PhotoService, 
              private userService : UsersService, 
              private activatedRoute : ActivatedRoute, 
              private route : Router, 
              private location : Location, 
              private notifierService : NotifierService) { }

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get('userId');
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(userId != localStorage.getItem("myPhotos_id")){
      this.route.navigate(['/photo/'+id]);
    }
    
    if(id){
      this.photoService.getPhoto(id).subscribe((res:any)=>{
        if(res.status==="OK" && res.message.length > 0){
          this.photo = res.message[0];
          console.log(res.message[0]);
          this.isLoading = false;

          this.liked = res.message[0].likes.includes(localStorage.getItem("myPhotos_id"));

          this.numberLikes = res.message[0].numberLikes;
          
          const loggedInUser = localStorage.getItem("myPhotos_id");
          if(loggedInUser) {
            this.login = true;
            this.userService.isFavoritePhoto(loggedInUser, this.photo).subscribe((res:any)=>{
              if(res.status ==="OK") this.isFavorite = true;
            });
      
    }
          
        }else{
          this.location.back();
        }    
      },(err:any)=>{
        this.location.back();
      });
    }else{
      this.location.back();
    }

    
   
    this.owner = window.location.toString().includes("MyPhotos")

  }

  share(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = window.location.origin + "/photo/" + id;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    this.notifierService.notify("info", "Link de partilha copiado para o clipboard.");
  }

  addFavorite(){
    const userId = localStorage.getItem("myPhotos_id");
    if(userId){
      this.userService.addFavoritePhoto(userId, this.photo).subscribe();
      this.isFavorite = true;
    }
  }

  removeFavorite(){
    const userId = localStorage.getItem("myPhotos_id");
    if(userId){
      this.userService.removeFavoritePhoto(userId, this.photo).subscribe();
      this.isFavorite = false;
    }
  }

  delete(): void {
    this.photoService.deletePhoto(this.photo).subscribe();
    //location.reload();
  }
  
  deleteClick(): void {
    this.deleteClicked = true; 
  }

  deleteToNotClicked():void{
    this.deleteClicked = false; 
  }

  like(): void {

    let userId = localStorage.getItem("myPhotos_id");
    if(userId){

      if(this.liked) {
        this.liked = false;
        this.numberLikes! -= 1;
        this.photoService.dislikePhoto(userId, this.photo).subscribe();
        //location.reload();
      } else {
        this.liked = true;
        this.numberLikes! += 1;
        this.photoService.likePhoto(userId, this.photo).subscribe();
        //location.reload();
      }
    }
  }

  goBack(){this.location.back();}


}
