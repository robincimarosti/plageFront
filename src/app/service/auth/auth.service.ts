import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8280/api';  // Remplacez par l'URL de votre API backend
  token$: Observable<boolean>;
  private tokenSub$: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    // Dans AuthService
    this.tokenSub$ = new BehaviorSubject<boolean>(!!localStorage.getItem('isConnected'));
    //this.tokenSub$ = new BehaviorSubject<boolean>(false);
    this.token$ = this.tokenSub$.asObservable();
  }

  get token(): boolean {
    return this.tokenSub$.getValue();
  }

  login(email: string, motDePasse: string): Observable<boolean> {
    const loginData = { email, motDePasse };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(`${this.apiUrl}/login`, loginData, { headers, responseType: 'text' })
      .pipe(
        map((response: string) => {
          if (response === 'Authentification réussie') {
            localStorage.setItem('isConnected', 'true');
            this.tokenSub$.next(true);
            return true;
          }
          localStorage.removeItem('isConnected');
          this.tokenSub$.next(false);
          return false;
        }),
        catchError((error) => {
          this.tokenSub$.next(false);
          localStorage.removeItem('isConnected');
          return of(false);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('isConnected');
    this.tokenSub$.next(false);
  }
}
