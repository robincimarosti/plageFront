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

  isConnected$: Observable<boolean>

  constructor (private authService: AuthService, private router: Router) {
  }

  ngOnInit () {
    this.isConnected$ = this.authService.token$
  }

  onClickLogout(): void {
    this.authService.logout()
    this.router.navigateByUrl('/login')
  }

}
