import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {

  message;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.forUser();
  }

  forUser(){
    this.userService.forUser().subscribe (
      (response) => {
        console.log(response);
        this.message = response;
      }, 
      (error) =>{
        console.log(error);
      }
    )
  }

}
