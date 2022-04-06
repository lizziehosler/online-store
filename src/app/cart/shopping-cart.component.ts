import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {CartService} from '../services/cart.service';
import {CartItem} from '../common/cart-item';

@Component({
  selector: 'app-shopping-cart',
  template: `
    <mat-horizontal-stepper #stepper>
      <mat-step>
        <form>
          <ng-template matStepLabel>Shopping Cart</ng-template>
          <div>
            <h2 *ngIf="this.books.length === 0">Your shopping cart is empty :(</h2>
            <div *ngIf="this.books.length !== 0">
              <table mat-table [dataSource]="dataSource" class="mat-elevation-z8 book-table">
                <!-- Image Column -->
                <ng-container matColumnDef="image">
                  <th mat-header-cell *matHeaderCellDef></th>
                  <td mat-cell *matCellDef="let book"><img src="{{book.imageUrl}}" height="100" (error)="onImageError($event)"></td>
                </ng-container>

                <ng-container matColumnDef="name">
                  <th mat-header-cell *matHeaderCellDef>Title</th>
                  <td mat-cell *matCellDef="let book">
                    <div class="cart-spacing">
                      <div>{{book.name}}</div>
                      <div>{{book.unitPrice}}</div>
                    </div>
                  </td>
                </ng-container>

                <ng-container matColumnDef="quantity">
                  <th mat-header-cell *matHeaderCellDef></th>
                  <td mat-cell *matCellDef="let book">
                    <div>Quantity: {{book.quantity}}</div>
                  </td>
                </ng-container>

                <ng-container matColumnDef="subtotal">
                  <th mat-header-cell *matHeaderCellDef></th>
                  <td mat-cell *matCellDef="let book">
                    <div>Subtotal: {{book.quantity * book.unitPrice}}</div>
                  </td>
                </ng-container>

                <!-- Delete Column -->
                <ng-container matColumnDef="delete">
                  <th mat-header-cell *matHeaderCellDef></th>
                  <td mat-cell *matCellDef="let book">
                    <mat-icon (click)="deleteBook(book.id, book.name)" style="cursor:pointer;" matTooltip="Delete Book">delete</mat-icon>
                  </td>
                </ng-container>

                <!--              <ng-container matColumnDef="delete">-->
                <!--                <th mat-header-cell *matHeaderCellDef></th>-->
                <!--                <td mat-cell *matCellDef="let book">-->
                <!--                </td>-->
                <!--              </ng-container>-->


                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
              </table>
            </div>
            <div class="button-right">
              <h3>Total quantity: {{totalQuantity}}</h3>
              <h3>Total price: {{totalPrice | currency}}</h3>
              <button
                mat-raised-button
                color="primary"
                matStepperNext
                [disabled]="this.books.length === 0"
              >
                Continue to shipping
              </button>
            </div>
          </div>
        </form>
      </mat-step>
      <mat-step label="Shipping">
        <h2>Shipping</h2>
        <form>
          <div class="button-left">
            <button mat-raised-button color="primary" matStepperPrevious>Back</button>
          </div>
          <div class="button-right">
            <button mat-raised-button color="primary" matStepperNext>Continue to payment</button>
          </div>
        </form>
      </mat-step>
      <mat-step>
        <ng-template matStepLabel>Payment</ng-template>
        <h2>Payment</h2>
        <div class="button-left">
          <button mat-raised-button color="primary" matStepperPrevious>Back</button>
        </div>
        <div class="button-right">
          <button mat-raised-button color="primary" matStepperNext>Pay now</button>
        </div>
      </mat-step>
      <mat-step>
        <ng-template matStepLabel>Confirmation</ng-template>
        <h2>Thank you for your purchase!</h2>
        <div class="button-left">
          <button mat-raised-button color="primary" matStepperPrevious>Back</button>
        </div>
      </mat-step>
    </mat-horizontal-stepper>
  `,
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['image', 'name', 'quantity', 'subtotal', 'delete'];
  totalPrice = 0;
  totalQuantity = 0;
  books: CartItem[] = [];


  constructor(
    private cartService: CartService
  ) {

  }

  ngOnInit(): void {
    this.listCartInventory();
  }

  listCartInventory() {
    this.dataSource.data = this.cartService.cartItems;
    this.books = this.cartService.cartItems;
    this.cartService.cartPrice.subscribe(
      price => this.totalPrice = price
    );
    this.cartService.cartQuantity.subscribe(
      quantity => this.totalQuantity = quantity
    );
    this.cartService.computeTotals();

  }

  deleteBook(id: number, name: string) {

  }

  onImageError(event) {
    event.target.src = '../assets/images/covers/placeholder.png';
  }
}
