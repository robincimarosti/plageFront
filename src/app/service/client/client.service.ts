import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom, map } from 'rxjs';
import { Client, ClientForm, ClientHttp } from 'src/app/model/client';

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
      });
  }

  getAll(): Promise<Client[]> {
    return firstValueFrom(
      this.http.get<{ content: ClientHttp[] }>(this.baseUrl)
        .pipe(
          map((res) => {
            return res.content.map(Client.mapperFromHttp);
          })
        )
    );
  }

  // addClient(formData: Client): Observable<any> {
  //   return this.http.post<any>(this.baseUrl, formData);
  // }
  addClient(clientToAdd: ClientForm): void {
    const clientToSend = {
      ...clientToAdd,
      paysDto: {
        code: clientToAdd.pays.code,
        nom: clientToAdd.pays.nom
      },
      lienDeParenteDto: {
        id: clientToAdd.lienDeParente.id,
        nom: clientToAdd.lienDeParente.nom
      }
    };
    console.log('client à envoyer: ', clientToSend);
    this.http.post<Client>(`http://localhost:8180/api/clients`, clientToSend).subscribe(response => {
      // La réponse du serveur est reçue ici
      console.log('Réponse du serveur:', response);
      console.log('client send: ', clientToSend)
      // Ajouter le client à la liste des clients
      // Ici, nous supposons que le serveur renvoie le client ajouté
      const newClient = response;
      const currentClients = this.clientsSubject.getValue();
      this.clientsSubject.next([...currentClients, newClient]);
    });
  }
}
//     this.getNextId().then(nextId => {
//       const client: Client = {
//         ...clientToAdd,
//         id: nextId
//       };
//       const currentClients = this.clientsSubject.getValue();
//       this.clientsSubject.next([...currentClients, client]);
//     });
//   }

//   private getNextId(): Promise<number> {
//     return firstValueFrom(
//       this.clients$.pipe(
//         map(clients => {
//           const maxId = clients.reduce((max, client) => {
//             return client.id > max ? client.id : max;
//           }, 0);
//           return maxId + 1;
//         })
//       )
//     );
//   }
// }
