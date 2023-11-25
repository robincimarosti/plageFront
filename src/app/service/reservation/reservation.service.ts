import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom, map } from 'rxjs';
import { Client } from 'src/app/model/client';
import { Reservation, ReservationHttp } from 'src/app/model/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8180/api';
  private baseUrl;
  private reservationsSubject: BehaviorSubject<Reservation[]> = new BehaviorSubject<Reservation[]>([]);
  private reservations$: Observable<Reservation[]> = this.reservationsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.baseUrl = `${this.apiUrl}/reservations`;
    this.fetchReservations();
  }

  private fetchReservations(): void {
    this.getAll()
      .then((data: Reservation[]) => {
        this.reservationsSubject.next(data);
      });
  }

  getAll(): Promise<Reservation[]> {
    return firstValueFrom(
      this.http.get<{ content: ReservationHttp[] }>(this.baseUrl)
        .pipe(
          map((res) => {
            return res.content.map(Reservation.mapperFromHttp);
          })
        )
    );
  }
  getClients(): Promise<Client[]> {
    return firstValueFrom(
      this.http.get<Client[]>(`${this.apiUrl}/clients`)
        .pipe(
          map(res => res || [])
        )
    );
  }

}
