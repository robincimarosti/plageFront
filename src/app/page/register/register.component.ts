import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientForm } from 'src/app/model/client';
import { ClientService } from 'src/app/service/client/client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  paysList: any[] = [];
  liensDeParenteList: any[] = [];

  constructor(
    private router: Router,
    private clientService: ClientService
  ) {}

  addNewClient (newClient: ClientForm) {
    console.log('Nouveau client reçu:', newClient);
    this.clientService.addClient(newClient)
    this.router.navigateByUrl('/login')
  }
}
