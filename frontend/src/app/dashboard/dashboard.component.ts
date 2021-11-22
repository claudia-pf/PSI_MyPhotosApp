import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo';
import { PhotoService } from '../services/photo.service';
import { PhotoViewerService } from "../services/photo-viewer.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isLoading : boolean = true;
  title = 'Fotos mais recentes';
  photosDashboard: Photo[] = [];

  constructor(private photoService: PhotoService, public photoViewerService: PhotoViewerService, private router : Router) {}

  ngOnInit(): void {
    this.photoService.getMostRecentPhotos().subscribe(
      (photosDashboard) => {
        this.photosDashboard = photosDashboard;
        this.isLoading = false
      });
  }

  photoClick(photoId : string ){
    this.router.navigate(["photo/"+photoId]);
  }

}
