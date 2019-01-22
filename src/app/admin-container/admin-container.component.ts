import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-container',
  templateUrl: './admin-container.component.html',
  styleUrls: ['./admin-container.component.css']
})
export class AdminContainerComponent implements OnInit {

  constructor(public auth: AuthService, public router: Router) {

  }

  ngOnInit() {

  }

  globalReload() {
    window.location.reload();
  }

  logout() {
    this.auth.logout();
  }
}
