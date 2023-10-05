/* import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token$: Observable<boolean>
  private tokenSub$: BehaviorSubject<boolean>

  constructor () {
    this.tokenSub$ = new BehaviorSubject<boolean>(false)
    this.token$ = this.tokenSub$.asObservable() // uniquement de la lecture
  }

  get token (): boolean {
    return this.tokenSub$.getValue()
  }

  login (email: string, password: string): Promise<void | string> {
    return new Promise(
      (res, rej) => {

        setTimeout(() => {
          if (email === 'admin@admin.fr' && password === 'P@ssw0rd2023') {
            this.tokenSub$.next(true)
            res()
          } else {
            rej('Les identifiants sont incorrects')
          }
        }, 500)

      }
    )
  }

  logout (): void {
    this.tokenSub$.next(false)
  }
}
 */
