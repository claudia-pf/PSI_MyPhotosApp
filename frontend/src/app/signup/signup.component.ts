import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  haveChar : boolean = false;
  haveUpperCase : boolean = false;
  haveLowerCase : boolean = false;
  haveNumber : boolean = false;
  isValid : boolean = false;
  isLoading : boolean = false;

  nickname? : string; 
  password? : string; 

  constructor(private notifierService : NotifierService, private usersService : UsersService, private router : Router) { }

  ngOnInit(): void {
  }

  validatePassword(){
    if(this.password){
      this.haveChar = this.password.length >= 8;
      this.haveUpperCase = /(?=.*[A-Z])/.test(this.password);
      this.haveLowerCase = /(?=.*[a-z])/.test(this.password);
      this.haveNumber = /(?=.*[0-9])/.test(this.password);
      this.isValid = this.haveChar && this.haveUpperCase && this.haveLowerCase && this.haveNumber;
    }else{
      this.haveChar = false;
      this.haveUpperCase = false;
      this.haveLowerCase = false;
      this.haveNumber = false;
      this.isValid = false;
    }

    if(this.nickname){
      this.isValid = this.isValid && this.nickname.length >= 3;
    }else{
      this.isValid = false;
    }
  }

  submit(){
    if(this.nickname && this.password){
      this.isLoading = true;
      this.usersService.register(this.nickname, this.password).subscribe(
        (res : any) => {
          if(res.status === "NOK" && res.message){
            this.notifierService.notify("warning", res.message);
          }else if(res.status === "NOK"){
            this.notifierService.notify("warning", "Não foi possível registar. Tente novamente mais tarde.");
          }else{
            this.notifierService.notify("success", "Registado com sucesso!");
            this.router.navigate(['/login']);

          }
          this.isLoading = false;
      },
        (err : any) => {
          this.notifierService.notify("error", "Não foi possível realizar esta ação.");
          this.isLoading = false;
      });
    }
  }

}
