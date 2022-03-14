import {Component, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';
import {Book} from '../common/book';
import {MatTableDataSource} from '@angular/material/table';
import {CartItem} from '../common/cart-item';
import {CartService} from '../services/cart.service';
import {CartStatusPopupComponent} from '../component/popups/cart-status-popup/cart-status-popup.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-homepage',
  template: `
    <h1>the book shop</h1>
    <div class="title-pic">
      <img src="./assets/images/logo/books.png">
    </div>
    <hr>
    <div fxLayout="row-wrap" class="card-wrapper">
      <div *ngFor="let book of books">
        <mat-card class="homepage-card">
          <mat-card-header>
            <mat-card-title>{{book.name}}</mat-card-title>
            <mat-card-subtitle>{{book.description}}</mat-card-subtitle>
          </mat-card-header>
          <img mat-card-image src="{{book.imageUrl}}" height="400px" (error)="onImageError($event)">
          <mat-card-actions>
            <div class="price">
              <mat-card-title>{{book.unitPrice | currency}}</mat-card-title>
            </div>
            <div class="add-to-cart">
              <button mat-raised-button color="accent" (click)="addToCart(book)">ADD TO CART</button>
            </div>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  books: Book[];
  dataSource = new MatTableDataSource([]);
  cartPrice = 0.00;

  constructor(
    private bookService: BookService,
    private cartService: CartService,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.listBooks();
    this.getSubTotal();
  }

  listBooks() {
    this.bookService.getBookList().subscribe(
      data => {
        this.books = data;
        this.dataSource.data = data;
      }
    );

  }

  onImageError(event) {
    event.target.src = '../assets/images/covers/placeholder.png';
  }

  addToCart(book: Book) {
    const cartItem = new CartItem(book);
    this.cartService.addToCart(cartItem);
    this.cartStatusUpdate(book.name);
  }

  private cartStatusUpdate(title) {
    console.log(this.cartPrice);
    this.dialog.open(CartStatusPopupComponent, {
      data: {
        bookTitle: title,
        totalPrice: this.cartPrice
      },
    });
  }

  private getSubTotal() {
    this.cartService.cartPrice.subscribe(
      data => this.cartPrice = data
    );
  }


}
