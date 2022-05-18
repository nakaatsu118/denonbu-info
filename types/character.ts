import { Area } from "./area";

export interface Root {
  contents: Character[]
  totalCount: number
  offset: number
  limit: number
}

export interface Character {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  name: string
  furigana: string
  english_name: string
  area: Area
  height: string
  age?: string
  birth_date?: string
  voice_actor?: string
  color: string
}
