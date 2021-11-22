import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Photo } from '../photo';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { Location } from "@angular/common";


@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})

export class UploadPhotoComponent implements OnInit {
  userId: String = localStorage.getItem("myPhotos_id")!;
  thumbnail? : string
  maxDescription = 500;
  maxName = 100;
  role = '';
  role2 = '';
  chars = 0;
  photoB64? : string;
  photoName? : string;
  isValid : boolean = false;
  hasDescription : boolean = false;
  uploadClicked : boolean = false;
  isLoading: boolean = false;

  constructor( private photoService : PhotoService, private notifierService : NotifierService, private router:Router, private location: Location,) { }

  ngOnInit(): void {
    console.log(this.userId)
    if(!this.userId){
      this.router.navigate(["login"]);
    }
  }

  tryUpload(name : string, description : string): void{
    if(name===""){
      name = this.photoName!;
    }
    if(description===""){
      this.hasDescription=false;
      this.uploadClicked=true;
    }else{
      this.hasDescription=true;
      this.uploadClicked=true;
      this.upload(name, description);
    }
  }

  upload(name : string, description : string): void{
    this.isLoading = true;
    if(name===""){
      name = this.photoName!;
    }
    const userId = this.userId;
      let data = {
        name: name,
        description:description,
        photoB64: this.photoB64,
        numberLikes: 0,
        userId: userId,
      };
      this.photoService.upload(data as Photo).subscribe(
        (res : any) => {
          if(res.status === "NOK"){
            this.notifierService.notify("error", "Não foi possível publicar a fotografia.");
            this.changeToNotClicked();
          }else if(res.status === "OK"){
            this.router.navigate(["MyPhotos"]);
            this.notifierService.notify("success", "Fotografia publicada com sucesso.");
          }
          this.isLoading = false;
      },
        (err : any) => {
          this.notifierService.notify("error", "Ocorreu um erro. Não foi possível publicar a fotografia.");
          this.changeToNotClicked();
          this.isLoading = false;
      });
  }

  changeToNotClicked():void{
    this.hasDescription=false;
    this.uploadClicked=false;
  }

  previewFile(event: Event): void {
    const preview = document.querySelector('img');
    const file = (event.target as HTMLInputElement).files![0];
    const reader = new FileReader();
  
    reader.onload = () => {
        preview!.src = reader.result as string; 
        this.photoB64=preview?.src;
        this.photoName=(event.target as HTMLInputElement).files![0].name;
        this.isValid=true;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  goBack(): void {
    this.location.back();
  }

}
