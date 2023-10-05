// Représente la donnée qui arrive de l'API
export interface CharacterHttp {
  _id: number
  name:	string
  films:	string[]
  videoGames:	string[]
  parkAttractions:	string[]
  imageUrl: string
  createdAt: string
  updatedAt: string
}

// Représente la donnée que l'on va utiliser dans notre front
export interface Character {
  id: number
  name:	string
  films:	string[]
  videoGames:	string[]
  parkAttractions:	string[]
  imgUrl: string
  createdAt: Date
  updatedAt: Date
}

export type CharacterForm = Omit<Character, 'id'>

export namespace Character {
  export function mapperFromHttp(characterHttp: CharacterHttp): Character {
    return {
      id: characterHttp._id,
      name:	characterHttp.name,
      films:	characterHttp.films,
      videoGames:	characterHttp.videoGames,
      parkAttractions:	characterHttp.parkAttractions,
      imgUrl:	characterHttp.imageUrl,
      createdAt: new Date(characterHttp.createdAt),
      updatedAt: new Date(characterHttp.updatedAt)
    }
  }
}
