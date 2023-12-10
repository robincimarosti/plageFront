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

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkInitialAuthState());

  private checkInitialAuthState(): boolean {
    return !!localStorage.getItem('isConnected');
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login(email: string, motDePasse: string): Observable<boolean> {
    const loginData = { email, motDePasse };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(`${this.apiUrl}/login`, loginData)
      .pipe(
        map((response) => {
          if (response.message === 'Authentification réussie') {
            localStorage.setItem('isConnected', 'true');
            localStorage.setItem('clientId', response.clientId.toString());
            this.isAuthenticatedSubject.next(true);
            this.tokenSub$.next(true);
            return true;
          } else {
            localStorage.removeItem('isConnected');
            localStorage.removeItem('clientId');
            this.tokenSub$.next(false);
            this.isAuthenticatedSubject.next(false);
            return false;
          }
          // localStorage.removeItem('isConnected');
          // localStorage.removeItem('clientId');
          // this.tokenSub$.next(false);
          // return false;
        }),
        catchError((error) => {
          this.isAuthenticatedSubject.next(false);
          // localStorage.removeItem('isConnected');
          // localStorage.removeItem('clientId');
          // this.tokenSub$.next(false);
          return of(false);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('isConnected');
    localStorage.removeItem('clientId'); // Assurez-vous de supprimer aussi l'ID du client
    this.isAuthenticatedSubject.next(false);
    this.tokenSub$.next(false);
  }
}
