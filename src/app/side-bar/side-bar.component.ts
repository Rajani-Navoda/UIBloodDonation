import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SideBarService } from '../_services/side-bar.service';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements AfterViewInit, OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
  // @ViewChild('sidenav') sidenav?: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  isMobile = false;
  showSettings: boolean = false;
  showCustomize: boolean = false; 

  userRole: string = '';

  constructor(
    private sideBarService: SideBarService,
    private cdr: ChangeDetectorRef,
    private userAuthService: UserAuthService
  ) { }

  ngOnInit(): void {
    this.checkScreenSize();
    const roleObj = this.userAuthService.getRoles();
     if (Array.isArray(roleObj) && roleObj.length > 0) {
    this.userRole = roleObj[0].roleName;
    console.log('User role:', this.userRole); // Should log "ADMIN"
  }

  
  }

  ngAfterViewInit(): void {
    this.sideBarService.isOpen$.subscribe(open => {
      if (this.sidenav) {
        this.sidenav.opened = open;
        this.cdr.detectChanges();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    this.cdr.detectChanges();
  }

  toggleSidebar() {
    if (this.isMobile) {
      this.sidenav.toggle();
    } else {
      this.isExpanded = !this.isExpanded;
    }
    if (!this.isExpanded) {
      this.showSubmenu = false;
      this.showSubSubMenu = false;
      this.showCustomize = false;
      this.showSettings = false;
    }
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }



}
