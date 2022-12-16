import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public user: User | undefined;

  constructor() {}

  ngOnInit(): void {
    const storedUser = window.sessionStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser) as User;
    } else {
      this.user = undefined;
    }
  }

  public logout(): void {
    window.sessionStorage.clear();
    window.location.href = '/login';
  }
}
