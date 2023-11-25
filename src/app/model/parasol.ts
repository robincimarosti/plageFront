// Représente la donnée qui arrive de l'API
export interface ParasolHttp {
  id: number
  numEmplacement:	number
  file: {
    id: number;
    numero: number;
    prixJournalier: number;
  };
  reservations: any[];
}

// Représente la donnée que l'on va utiliser dans notre front
export interface Parasol {
  id: number
  numEmplacement:	number
  file: {
    id: number;
    numero: number;
    prixJournalier: number;
  };
}

export type ParasolForm = Omit<Parasol, 'id'>

export namespace Parasol {
  export function mapperFromHttp(parasolHttp: ParasolHttp): Parasol {
    return {
      id: parasolHttp.id,
      numEmplacement:	parasolHttp.numEmplacement,
      file: {
        id: parasolHttp.file.id,
        numero: parasolHttp.file.numero,
        prixJournalier: parasolHttp.file.prixJournalier,
      },
    }
  }
}
