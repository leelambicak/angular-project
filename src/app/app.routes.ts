import { Routes } from '@angular/router';
import { BirthdayComponent } from './birthday/birthday.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AnniversaryComponent } from './anniversary/anniversary.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DisplayComponent } from './display/display.component';
import { MainComponent } from '../main/main.component';
import { BelatedAnniversaryComponent } from './belated-anniversary/belated-anniversary.component';

export const routes: Routes = [

    {path:'home',component:HomeComponent},
    {path:'',component:HomeComponent},
    {path:'display',component:DisplayComponent},
   
];
