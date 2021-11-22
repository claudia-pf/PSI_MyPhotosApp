import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { NotifierModule } from 'angular-notifier';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { LoginComponent } from './login/login.component';
import { LoaderComponent } from './util/loader/loader.component';
import { MyphotosComponent } from './myphotos/myphotos.component';
import { PhotoViewerModule } from './photo-viewer/photo-viewer.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopNavMenuComponent } from './top-nav-menu/top-nav-menu.component';
import { PhotoViewerV2Component } from './photo-viewer-v2/photo-viewer-v2.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { PopularComponent } from './popular/popular.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    UploadPhotoComponent,
    LoginComponent,
    LoaderComponent,
    MyphotosComponent,
    DashboardComponent,
    TopNavMenuComponent,
    PhotoViewerV2Component,
    FavoritesComponent,
    PopularComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    PhotoViewerModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'middle',
          distance: 12,
        },
        vertical: {
          position: 'top',
          distance: 75,
          gap: 10,
        },
      },
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
