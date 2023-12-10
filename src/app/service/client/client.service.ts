import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom, map } from 'rxjs';
import { Client, ClientForm, ClientHttp } from 'src/app/model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8280/api'
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

  getById(clientId: number): Promise<Client> {
    return firstValueFrom(
      this.http
        .get<ClientHttp>(`${this.baseUrl}/${clientId}`)
        .pipe(
          map(res => Client.mapperFromHttp(res))
        )
    );
  }

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
    // La réponse du serveur est reçue ici
    this.http.post<Client>(`http://localhost:8280/api/clients`, clientToSend).subscribe(response => {
      // Ajouter le client à la liste des clients
      const newClient = response;
      const currentClients = this.clientsSubject.getValue();
      this.clientsSubject.next([...currentClients, newClient]);
    });
  }

  editClient(clientToEdit: Client): Promise<Client> {
    // Construire le payload de la requête
  const updatePayload: any = {
    ...clientToEdit,
    motDePasse: clientToEdit.motDePasse && clientToEdit.motDePasse.trim() !== ''
                ? clientToEdit.motDePasse : undefined,
    paysDto: {
      code: clientToEdit.pays.code,
      nom: clientToEdit.pays.nom
    },
  };

  return firstValueFrom(
    this.http.patch<Client>(`${this.baseUrl}/${clientToEdit.id}`, updatePayload)
  );
}
}
