import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  errMsg?: string

  constructor (private authService: AuthService, private router: Router) {
  }

  onSubmitLoginForm (loginForm: NgForm) {
    this.errMsg = undefined
    if (loginForm.valid) {

      const { email, password } = loginForm.value

      this.authService
        .login(email, password)
        .then(() => this.router.navigateByUrl('/reservations'))
        .catch(errMsg => this.errMsg = errMsg)
    }
  }

}
