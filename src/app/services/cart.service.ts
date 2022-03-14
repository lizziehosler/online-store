import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {CartItem} from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  cartPrice: Subject<number> = new Subject<number>();
  cartQuantity: Subject<number> = new Subject<number>();

  constructor() {
  }

  addToCart(cartItem: CartItem) {
    let alreadyExistsInCart = false;
    let existingCartItem: CartItem;
    if (this.cartItems.length > 0) {
      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === cartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }

      alreadyExistsInCart = (existingCartItem !== undefined);
    }

    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }
    this.computeTotals();
  }


  private computeTotals() {
    let totalPrice = 0;
    let totalQuantity = 0;

    for (let cartItem of this.cartItems) {
      totalPrice += cartItem.quantity * cartItem.unitPrice;
      totalQuantity += cartItem.quantity;
    }

    this.cartPrice.next(totalPrice);
    this.cartQuantity.next(totalQuantity);

    console.log('cart:');
    for (let cartItem of this.cartItems) {
      const subTotal = cartItem.quantity * cartItem.unitPrice;
      console.log(`name: ${cartItem.name}, quantity: ${cartItem.quantity}, price: ${cartItem.unitPrice}, subtotal: ${subTotal}`);
    }
    console.log(`total price: ${totalPrice.toFixed(2)}, total quanityt: ${totalQuantity}`);
    console.log('---');

  }
}
