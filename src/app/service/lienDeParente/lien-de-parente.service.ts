import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { LienDeParente } from 'src/app/model/lienDeParente';

@Injectable({
  providedIn: 'root'
})
export class LienDeParenteService {
  private apiUrl = 'http://localhost:8280/api';

  constructor(private http: HttpClient) { }

  getLiensDeParente(): Promise<LienDeParente[]> {
    return firstValueFrom(
      this.http.get<LienDeParente[]>(`${this.apiUrl}/liendeparente`)
        .pipe(
          map(res => res || [])
        )
    );
  }

  // Ajoutez d'autres méthodes si nécessaire
}
