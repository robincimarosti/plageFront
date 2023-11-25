import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/model/reservation';
import { ClientService } from 'src/app/service/client/client.service';
import { ReservationService } from 'src/app/service/reservation/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  clients: any[] = [];

  constructor(private readonly reservationService: ReservationService) {
  }

  ngOnInit() {
    this.loadReservations();
  }

  private loadReservations(): void {
    this.reservationService
      .getAll()
      .then((reservations: Reservation[]) => {
        this.loadClients();
      });
  }

  private loadClients(): void {
    this.reservationService.getClients().then((clients: any[]) => {
      this.clients = clients;
    });
  }
}
