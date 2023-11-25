// Représente la donnée qui arrive de l'API
export interface ClientHttp {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  pays: {
    code: string;
    nom: string;
  };
  lienDeParente: {
    id: number;
    nom: string;
    coefficient: number;
  };
  reservations: any[];
  dateHeureInscription: Date;
}

// Représente la donnée que l'on va utiliser dans notre front
export interface Client {
  id: number
  nom:	string
  prenom:	string
  email:	string
  motDePasse:	string
  pays: {
    code: string;
    nom: string;
  };
  lienDeParente: {
    id: number;
    nom: string;
    coefficient: number;
  };
}

export type ClientForm = Omit<Client, 'id'>

export namespace Client {
  export function mapperFromHttp(clientHttp: ClientHttp): Client {
    return {
      id: clientHttp.id,
      nom:	clientHttp.nom,
      prenom:	clientHttp.prenom,
      email:	clientHttp.email,
      motDePasse:	clientHttp.motDePasse,
      pays: {
        code: clientHttp.pays.code,
        nom: clientHttp.pays.nom,
      },
      lienDeParente: {
        id: clientHttp.lienDeParente.id,
        nom: clientHttp.lienDeParente.nom,
        coefficient: clientHttp.lienDeParente.coefficient,
      },
    }
  }
}
