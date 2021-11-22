import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { PhotoService } from '../services/photo.service';
import { PhotoViewerService } from "../services/photo-viewer.service";
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {

  isLoading : boolean = true;
  title = 'Fotos mais populares';
  photosPopular: Photo[] = [];
  hasPhotos: boolean = false;

  constructor(private photoService: PhotoService, private notifierService : NotifierService, public photoViewerService: PhotoViewerService, private router : Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.photoService.getMostPopularPhotos().subscribe(
      (res : any) => {
        if(res.status === "NOK"){
          this.notifierService.notify("error", "Não foi possível obter as fotos.");
        }else if(res.status === "OK"){
          const jsonobject = res;
          this.photosPopular= res.message;
          if(this.photosPopular.length !== 0){
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
    this.router.navigate(["photo/"+photoId]);
  }

}
