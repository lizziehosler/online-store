import {Genre} from './genre';

export class Book {
  id: number;
  sku: string;
  name: string;
  description: string;
  unitPrice: number;
  imageUrl: string;
  active: boolean;
  unitsInStock: number;
  lastUpdated: Date;
  genre: Genre;
}
