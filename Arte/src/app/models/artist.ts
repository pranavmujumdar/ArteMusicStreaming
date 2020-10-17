import { Album } from './albums';

export class Artist {
  id: number;
  // tslint:disable-next-line: ban-types
  name: String;
  genre: any;
  albums: Album[];
  artistId: string;
}
