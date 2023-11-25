import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/service/client/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [];

  constructor (private readonly clientService: ClientService) {
  }

  ngOnInit () {
    this.loadClients()
  }

  private loadClients (): void {
    this.clientService
      .getAll()
      .then((clients: Client[] ) => {
        this.clients = clients;
      });
  }
}

