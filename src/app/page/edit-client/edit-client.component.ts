import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, ClientForm } from 'src/app/model/client';
import { ClientService } from 'src/app/service/client/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  client$: Promise<Client>

  clients: Client[]

  constructor (private clientService: ClientService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // this.loadClients()
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.client$ = this.clientService.getById(+id)
    }
  }

  editClient(clientEdited: ClientForm) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const updatePayload: any = {
        ...clientEdited,
        id: +id,
        paysDto: {
          code: clientEdited.pays.code,
          nom: clientEdited.pays.nom
        }
      };
      if (!clientEdited.motDePasse) {
        delete updatePayload.motDePasse;
      }
    console.log("Client à mettre a jour", updatePayload)
      this.clientService.editClient(updatePayload).then(() => {
        this.router.navigateByUrl('/reservations');
      });
    }
  }

  // onClickDeleteClient (id: number) {
  //   this.clientService.delete(id)
  //   this.loadClients()
  // }

  // private loadClients (): void {
  //   this.clientService
  //     .getAll()
  //     .then((data: Client[]) => {
  //       this.clients = data;
  //     });
  // }
}
