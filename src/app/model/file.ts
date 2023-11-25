// Représente la donnée qui arrive de l'API
export interface FileHttp {
  id: number;
  numero: number;
  prixJournalier: number;
}

// Représente la donnée que l'on va utiliser dans notre front
export interface FileData extends FileHttp {
  id: number;
  numero: number;
  prixJournalier: number;
}

export type FileForm = Omit<File, 'id'>

export namespace FileData {
  export function mapperFromHttp(fileHttp: FileHttp): FileData {
    return {
      id: fileHttp.id,
      numero:	fileHttp.numero,
      prixJournalier:	fileHttp.prixJournalier,
    }
  }
}
