import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';

import {MyphotosComponent} from './myphotos/myphotos.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhotoViewerV2Component } from './photo-viewer-v2/photo-viewer-v2.component';
import {PopularComponent} from './popular/popular.component';

import { 
  AuthGuardService as AuthGuard 
} from './services/auth-guard.service';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: '', component: DashboardComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'MyPhotos/upload', component: UploadPhotoComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'MyPhotos', component: MyphotosComponent, canActivate: [AuthGuard] },
  { path: 'photo/:id', component: PhotoViewerV2Component},
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard]},
  { path: 'popular', component: PopularComponent},
  { path: 'MyPhotos/:userId/photo/:id', component: PhotoViewerV2Component, canActivate: [AuthGuard] },
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
