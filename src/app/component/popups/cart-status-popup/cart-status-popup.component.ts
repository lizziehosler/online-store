import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  bookTitle: string;
  totalPrice: number;
}

@Component({
  selector: 'app-cart-status-popup',
  template: `
    <div class="cart-status-popup">
      <h2 mat-dialog-title>{{book}} has been added to your cart.</h2>
      <h1 mat-dialog-content>
        SUBTOTAL: {{subTotal | currency}}
      </h1>
      <div class="buttons">
        <button mat-button mat-dialog-close>Continue Shopping</button>
        <button mat-button mat-dialog-close [routerLink]="['/cart']">View Cart</button>
      </div>
    </div>
  `,
  styleUrls: ['./cart-status-popup.component.scss']
})
export class CartStatusPopupComponent implements OnInit {
  book: string;
  subTotal: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.book = this.data.bookTitle;
      this.subTotal = this.data.totalPrice;
    }
  }

}
