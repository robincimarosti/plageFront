// Représente la donnée qui arrive de l'API
export interface PaysHttp {
  code: string;
  nom: string;
  nbClients: number;
}

// Représente la donnée que l'on va utiliser dans notre front
export interface Pays extends PaysHttp {
  code: string;
  nom: string;
  nbClients: number;
}

export type PaysForm = Omit<Pays, 'code'>

export namespace Pays {
  export function mapperFromHttp(paysHttp: PaysHttp): Pays {
    return {
      code: paysHttp.code,
      nom:	paysHttp.nom,
      nbClients:	paysHttp.nbClients,
    }
  }
}
