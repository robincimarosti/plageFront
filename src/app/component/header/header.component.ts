import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  idClientConnecte: number | null;

  constructor (private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
      console.log("ID Client Connecté: ", this.idClientConnecte);
      if (isAuthenticated) {
        this.idClientConnecte = parseInt(localStorage.getItem('clientId') || '0', 10);
      } else {
        this.idClientConnecte = null;
      }
    });
  }

  onClickLogout(): void {
    this.authService.logout()
    this.router.navigateByUrl('/login')
  }

}
