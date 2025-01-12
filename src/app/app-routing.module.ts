import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { DonorComponent } from './donor/donor.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './_auth/auth.guard';
import { BloodBankComponent } from './blood-bank/blood-bank.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'admin', component:AdminComponent, canActivate: [AuthGuard], data: {roles: ['ADMIN']}},
  {path:'donor', component:DonorComponent, canActivate: [AuthGuard], data: {roles: ['USER']}},
  {path: 'organizer', component:OrganizerComponent, canActivate: [AuthGuard], data: {roles:['ORGANIZER']}},
  {path: 'bloodBank', component:BloodBankComponent, canActivate: [AuthGuard], data: {roles:['BLOOD_BANK']}},
  {path:'login', component:LoginComponent},
  {path:'forbidden', component:ForbiddenComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
