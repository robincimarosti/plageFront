import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { Pays } from 'src/app/model/pays';

@Injectable({
  providedIn: 'root'
})
export class PaysService {
  private apiUrl = 'http://localhost:8280/api';

  constructor(private http: HttpClient) { }

  getPays(): Promise<Pays[]> {
    return firstValueFrom(
      this.http.get<Pays[]>(`${this.apiUrl}/pays`)
        .pipe(
          map(res => res || [])
        )
    );
  }

  // Ajoutez d'autres méthodes si nécessaire
}
