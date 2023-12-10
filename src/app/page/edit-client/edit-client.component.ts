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

  constructor (private clientService: ClientService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.client$ = this.clientService.getById(+id)
    }
  }

  // editClient (clientEdited: ClientForm) {
  //   const id = this.route.snapshot.paramMap.get('id')
  //   if (id) {
  //     this.clientService.editClient(
  //       {
  //         ...clientEdited,
  //         id: +id!
  //       }
  //     ).then(() => {
  //       this.router.navigateByUrl('/reservations');
  //     });
  //   }
  // }

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

//   editClient(clientEdited: ClientForm) {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//         const clientToEdit: any = {
//             ...clientEdited,
//             id: +id,
//             paysDto: {
//                 code: clientEdited.pays.code,
//                 nom: clientEdited.pays.nom
//             }
//             // Autres attributs si nécessaire
//         };

//         // Exclure le mot de passe si non modifié
//         if (!clientEdited.motDePasse || clientEdited.motDePasse.trim() === '') {
//             delete clientToEdit.motDePasse;
//         }

//         this.clientService.editClient(clientToEdit).then(() => {
//             // Navigation après mise à jour
//             this.router.navigateByUrl('/reservations');
//         });
//     }
// }
}
