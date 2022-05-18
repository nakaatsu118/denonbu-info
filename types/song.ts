import { Character } from "./character";
import { Area } from "./area";

export interface Root {
  contents: Song[]
  totalCount: number
  offset: number
  limit: number
}

export interface Song {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  jacket_image: JacketImage
  release_date: string
  type: string[]
  all_flag: boolean
  characters: Character[]
  area: Area[]
  youtube: string
  streaming_link?: string
}

export interface JacketImage {
  url: string
  height: number
  width: number
}
