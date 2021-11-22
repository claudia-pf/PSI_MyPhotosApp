import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { asapScheduler } from 'rxjs';
import { PhotoService } from '../services/photo.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nickname?: string;
  password?: string;
  isValid: boolean = false;
  isLoading: boolean = false;

  constructor(private userService: UsersService, private notifierService: NotifierService, private router: Router, private photoService: PhotoService) { }

  ngOnInit(): void {
  }

  isFormValid() {
    if (this.nickname && this.password) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }

  login() {
    this.isLoading = true;
    if (this.nickname && this.password) {
      this.userService.login(this.nickname, this.password).subscribe(
        (res: any) => {
          if (res.status === "NOK") {
            this.notifierService.notify("warning", "Dados de login incorretos.");
          } else {
            this.notifierService.notify("success", "Bem vindo " + this.nickname + "!");
            localStorage.setItem("myPhotos_id", res.message);
            this.photoService.getPhotos().subscribe(
              (res: any) => {
                console.log(res);
                if (res.message.length > 0) {
                  this.router.navigate(["MyPhotos"]);
                } else {
                  this.router.navigate(["/"]);
                }
              },
              (err: any) => {
                this.notifierService.notify("error", "Não foi possível realizar esta ação.");
                this.isLoading = false;
              }
            );
          }
          this.isLoading = false;
        },
        (err: any) => {
          this.notifierService.notify("error", "Não foi possível realizar esta ação.");
          this.isLoading = false;
        });
    }
  }

}
