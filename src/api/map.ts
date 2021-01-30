import axios from 'axios';

export async function getMapData(): Promise<IMap[] | void> {
  const response = await axios.get<IMap[]>('https://fessport-server.com/main');
  return response.data;
}

export interface IMap {
  _id: string;
  name: string;
  y: number;
  x: number;
  flagImage: string;
  festivals: IFestival[];
}

interface IFestival {
  _id: string;
  name: string;
  thumbnail: string;
}
