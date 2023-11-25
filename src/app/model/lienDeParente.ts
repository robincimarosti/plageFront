// Représente la donnée qui arrive de l'API
export interface LienDeParenteHttp {
  id: number;
  nom: string;
  coefficient: number;
}

// Représente la donnée que l'on va utiliser dans notre front
export interface LienDeParente extends LienDeParenteHttp {
  id: number;
  nom: string;
  coefficient: number;
}

export type LienDeParenteForm = Omit<LienDeParente, 'id'>

export namespace LienDeParente {
  export function mapperFromHttp(lienDeParenteHttp: LienDeParenteHttp): LienDeParente {
    return {
      id: lienDeParenteHttp.id,
      nom:	lienDeParenteHttp.nom,
      coefficient:	lienDeParenteHttp.coefficient,
    }
  }
}
