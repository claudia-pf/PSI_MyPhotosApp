import { Component, OnChanges } from '@angular/core';
import {PhotoService} from '../services/photo.service'
import { PhotoViewerService } from "../services/photo-viewer.service";
import { Photo } from '../photo';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myphotos',
  templateUrl: './myphotos.component.html',
  styleUrls: ['./myphotos.component.css']
})
export class MyphotosComponent {

  title = 'A Minha Galeria';
  photos: Photo [] = [];
  isLoggedIn : boolean = false;
  isLoading: boolean = false;
  hasPhotos: boolean = false;

  constructor(
    private photoService: PhotoService,
    public photoViewerService: PhotoViewerService,
    private notifierService : NotifierService,
    private router : Router
    ) { 
    
  }

  ngOnInit(): void {
    let userId = localStorage.getItem("myPhotos_id");
    if(userId){
      this.isLoggedIn = true;
      this.getPhotos();
    }
  }

  getPhotos(): void {
    this.isLoading = true;
    this.photoService.getPhotos().subscribe(
      (res : any) => {
        if(res.status === "NOK"){
          this.notifierService.notify("error", "Não foi possível obter as fotos.");
        }else if(res.status === "OK"){
          const jsonobject = res;
          this.photos= res.message;
          if(this.photos.length !== 0){
            this.hasPhotos = true;
          }
        }
        this.isLoading = false;
    },
    (err : any) => {
      this.notifierService.notify("error", "Ocorreu um erro. Não foi possível obter as fotos.");
      this.isLoading = false;
  }
    );
  }

  photoClick(photoId : string ){
    const userId = localStorage.getItem("myPhotos_id");
    this.router.navigate(["MyPhotos/"+userId+"/photo/"+photoId]);
  }

}
