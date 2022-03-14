import {Book} from './book';

export class CartItem {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;

  quantity: number;

  constructor(book: Book) {
    this.id = book.id;
    this.name = book.name;
    this.unitPrice = book.unitPrice;
    this.imageUrl = book.imageUrl;

    this.quantity = 1;
  }
}
