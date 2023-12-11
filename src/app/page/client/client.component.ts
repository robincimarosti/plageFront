import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/service/client/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  client: Client
  idClientConnecte: number | null;

  constructor (private route: ActivatedRoute, private clientService: ClientService) {
  }
  ngOnInit(): void {
    this.idClientConnecte = parseInt(localStorage.getItem('clientId') || '0', 10);
    console.log("ID Client Connecté:", this.idClientConnecte);
    if(this.idClientConnecte && this.idClientConnecte > 0) {
      this.clientService.getById(this.idClientConnecte)
        .then(client => this.client = client);
    }
  }
  onClickDeleteClient (id: number) {
    this.clientService.delete(id)
  }
}
