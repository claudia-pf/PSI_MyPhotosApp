import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { PhotoService } from '../services/photo.service';
import { PhotoViewerService } from "../services/photo-viewer.service";
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  isLoading : boolean = true;
  title = 'Fotos favoritas';
  photosDashboard: Photo[] = [];

  constructor(private photoService: PhotoService,
              public photoViewerService: PhotoViewerService,
              private router : Router,
              private notifierService : NotifierService) { }

  ngOnInit(): void {
    this.photoService.getFavoritePhotos().subscribe(
      (res:any) => {
        this.photosDashboard = res.message;
        this.isLoading = false
      },(err:any)=>{
        this.notifierService.notify("error", "Não foi possivel concretizar esta ação.");
        setTimeout(() => {
          this.isLoading = false;
          this.router.navigate(["/"]);
        }, 1500);
        
      });
  }

  photoClick(photoId : string ){
    this.router.navigate(["photo/"+photoId]);
  }

}
