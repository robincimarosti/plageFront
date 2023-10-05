import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom, map } from 'rxjs';
import { Client, ClientHttp } from 'src/app/model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8180/api'
  private baseUrl;
  private clientsSubject: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  private clients$: Observable<Client[]> = this.clientsSubject.asObservable();


  constructor(private http: HttpClient) {
    this.baseUrl = `${this.apiUrl}/clients`;
    this.fetchClients();
  }

  private fetchClients(): void {
    this.getAll()
      .then((data: Client[]) => {
        this.clientsSubject.next(data);
        console.log('Clients dans le service :', data);
      });
  }

  getAll(): Promise<Client[]> {
    return firstValueFrom(
      this.http.get<{ content: ClientHttp[] }>(this.baseUrl)
        .pipe(
          map((res) => {
            console.log('Réponse de l\'API', res);
            return res.content.map(Client.mapperFromHttp);
          })
        )
    );
  }
}
