import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent {

  idClientConnecte: number | null;

  constructor (private authService: AuthService, private router: Router) {
  }

/*   ngOnInit() {
    this.idClientConnecte = this.authService.getConnectedClientId();
    console.log('ID du client connecté (récupéré) :', this.idClientConnecte);
  } */

  onClickLogout(): void {
    this.authService.logout()
    this.router.navigateByUrl('/login')
  }

}
