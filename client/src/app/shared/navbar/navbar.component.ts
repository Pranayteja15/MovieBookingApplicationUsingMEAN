import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth:AuthService, private router:Router) { }

  logoutUser(){
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('role')
    this.auth.setisLoggedin(false)
    this.router.navigate(['/login'])
  }
  ngOnInit(): void {
  }

}
