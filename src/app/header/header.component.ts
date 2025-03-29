import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('collapseExpand', [
      state('collapsed', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1
      })),
      transition('collapsed <=> expanded', [
        animate('0.5s ease-in-out')
      ])
    ])
  ],
})
export class HeaderComponent implements OnInit {

  constructor(private userAuthService: UserAuthService, private router: Router, public userService: UserService ) { }

  ngOnInit(): void {
  }

  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

  public logOut(){
    this.userAuthService.clear();
    this.router.navigate(['/home']);
  }

  isCollapsed = true; 
 
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed; 
 
  }

}
