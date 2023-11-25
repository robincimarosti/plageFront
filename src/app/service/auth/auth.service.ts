import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token$: Observable<boolean>
  private tokenSub$: BehaviorSubject<boolean>

  constructor (private http: HttpClient) {
    this.tokenSub$ = new BehaviorSubject<boolean>(false)
    this.token$ = this.tokenSub$.asObservable() // uniquement de la lecture
  }

  get token (): boolean {
    return this.tokenSub$.getValue()
  }


login(email: string, password: string): Promise<void> {
  const url = 'http://localhost:8180/api/login';
  return this.http.post<any>(url, { email, password }).toPromise()
    .then(response => {
      const token = response.token; // Assurez-vous que cette clé correspond à celle envoyée par votre backend
      this.storeToken(token);
      this.tokenSub$.next(true);
    })
    .catch(error => {
      this.tokenSub$.next(false);
      throw new Error('Authentification échouée');
    });
}

private storeToken(token: string): void {
  localStorage.setItem('auth_token', token); // Stocker le token dans localStorage
}

  // login (email: string, password: string): Promise<void | string> {
  //   return new Promise(
  //     (res, rej) => {

  //       setTimeout(() => {
  //         if (email === 'admin@admin.fr' && password === 'P@ssw0rd2023') {
  //           this.tokenSub$.next(true)
  //           res()
  //         } else {
  //           rej('Les identifiants sont incorrects')
  //         }
  //       }, 500)
  //     }
  //   )
  // }

  logout (): void {
    this.tokenSub$.next(false)
  }
}
