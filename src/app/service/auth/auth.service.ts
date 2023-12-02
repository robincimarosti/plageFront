import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(this.checkInitialAuthState());
  token: any;

  constructor(private http: HttpClient) {}

  private checkInitialAuthState(): boolean {
    // Récupérer l'état d'authentification sauvegardé dans le localStorage
    const savedState = localStorage.getItem('isAuthenticated');
    return savedState === 'true';
  }

  login(email: string, password: string): Observable<any> {
    const url = 'http://localhost:8280/api/login';
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    console.log('Email envoyé:', email);
    console.log('Password envoyé:', password);

    return this.http.post<any>(url, formData, { withCredentials: true })
    .pipe(tap((response) => {
      if (response && response.clientId) {
        this.isAuthenticated.next(true);
      localStorage.setItem('isAuthenticated', 'true');
      const clientId = response.clientId; // Assurez-vous que le backend renvoie l'ID du client
      localStorage.setItem('connectedClientId', clientId.toString());
      console.log('ID du client connecté (stocké) :', clientId);
      } else {
        console.error('Réponse inattendue du serveur:', response);
      }
    }));
  }

  logout(): void {
    this.isAuthenticated.next(false);
    localStorage.removeItem('isAuthenticated'); // Effacer l'état du localStorage
    // Ajoutez ici la logique pour appeler le point de terminaison de déconnexion du backend si nécessaire
  }

  isLoggedInValue(): boolean {
    return this.isAuthenticated.value;
  }

  getConnectedClientId(): number | null {
    const clientIdStr = localStorage.getItem('connectedClientId');
    return clientIdStr ? parseInt(clientIdStr, 10) : null;
  }
}
