import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, 
    private userAuthService: UserAuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  // login(loginForm: NgForm){

  //   const loginData = {
  //     userName: loginForm.value.userName,
  //     userPassword: loginForm.value.userPassword
  //   };

  //   this.userService.login(loginForm.value).subscribe({
  //     next: (response: any) => {
        
  //       console.log('Login response:', response); 
        
  //       if (response && response.jwtToken) {
       
  //         this.userAuthService.setToken(response.jwtToken);

  //         this.userAuthService.setRoles(response.user.role);
          
  //         const storedToken = localStorage.getItem('jwtToken');
  //         console.log('Stored token:', storedToken);
          
  //         const role = response.user.role[0].roleName;
  //         this.navigateByRole(role);
  //       } else {
  //         console.error('No token received in response');
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Login failed:', error);
  //     }
  //   });
  // }

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe({
        next: (response: any) => {
            if (response && response.jwtToken) {
                localStorage.setItem('jwtToken', response.jwtToken);
                this.userAuthService.setRoles(response.user.role);
                const role = response.user.role[0].roleName;
                this.navigateByRole(role);
            }
        },
        error: (error) => {
            console.error('Login failed:', error);
        }
    });
}




    private navigateByRole(role: string) {
      switch (role) {
          case 'ADMIN':
              this.router.navigate(['/admin']);
              break;
          case 'USER':
              this.router.navigate(['/donor']);
              break;
          case 'ORGANIZER':
              this.router.navigate(['/organizer']);
              break;
          case 'BLOOD_BANK':
              this.router.navigate(['/bloodBank']);
              break;
          default:
              this.router.navigate(['/forbidden']);
              break;
      }
  }
}
