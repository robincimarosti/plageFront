import { Client, ClientHttp } from "./client";
import { Parasol, ParasolHttp } from "./parasol";

// Représente la donnée qui arrive de l'API
export interface ReservationHttp {
  id: number;
  parasols: ParasolHttp[];
  clients: ClientHttp[];
  dateDebut: string;
  dateFin: string;
  montantAReglerEnEuros: number;
  remarques: string;
  statut: {
    id: number;
    nom: string;
  };
  concessionnaire: {
    id: number;
    nom: string;
  };
  numeroCarte: string;
  moisExpiration: number;
  anneeExpiration: number;
  cryptogramme: string;
}

// Représente la donnée que l'on va utiliser dans notre front
export interface Reservation {
  id: number;
  parasols: Parasol[];
  clients: Client[];
  dateDebut: string;
  dateFin: string;
  montantAReglerEnEuros: number;
  remarques: string;
  statut: {
    id: number;
    nom: string;
  };
  concessionnaire: {
    id: number;
    nom: string;
  };
  numeroCarte: string;
  moisExpiration: number;
  anneeExpiration: number;
  cryptogramme: string;
}

export type ReservationForm = Omit<Reservation, 'id'>;

export namespace Reservation {
  export function mapperFromHttp(reservationHttp: ReservationHttp): Reservation {
    return {
      id: reservationHttp.id,
      parasols: reservationHttp.parasols.map(Parasol.mapperFromHttp),
      clients: reservationHttp.clients.map(Client.mapperFromHttp),
      dateDebut: reservationHttp.dateDebut,
      dateFin: reservationHttp.dateFin,
      montantAReglerEnEuros: reservationHttp.montantAReglerEnEuros,
      remarques: reservationHttp.remarques,
      statut: {
        id: reservationHttp.statut.id,
        nom: reservationHttp.statut.nom,
      },
      concessionnaire: {
        id: reservationHttp.concessionnaire.id,
        nom: reservationHttp.concessionnaire.nom,
      },
      numeroCarte: reservationHttp.numeroCarte,
      moisExpiration: reservationHttp.moisExpiration,
      anneeExpiration: reservationHttp.anneeExpiration,
      cryptogramme: reservationHttp.cryptogramme,
    };
  }
}
