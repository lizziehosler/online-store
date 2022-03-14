import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {OKTA_AUTH} from '@okta/okta-angular';
import {OktaAuth} from '@okta/okta-auth-js';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <!--      <mat-icon [routerLink]="['']" class="home-button">home</mat-icon>-->
      <a [routerLink]="['']" class="home-button">
        <img src="././assets/images/logo/book.png" height="40" alt="book"/>
      </a>
      <div class="spacer"> |</div>
      <mat-icon [routerLink]="['/cart']" [matBadge]="cartQuantity" matBadgeColor="warn">shopping_cart</mat-icon>
      <div class="admin-menu">
        <app-login-status></app-login-status>
        <div *ngIf="isAuthenticated">
          <button mat-button [matMenuTriggerFor]="menu">ADMIN</button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item
                    [routerLink]="['/users']">USERS
            </button>
            <button mat-menu-item
                    [routerLink]="['/admin/books']">ADD BOOKS
            </button>
          </mat-menu>
        </div>
      </div>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  isAuthenticated!: boolean;
  cartPrice = 0.00;
  cartQuantity = 0;

  constructor(@Inject(OKTA_AUTH)
              public oktaAuth: OktaAuth,
              private cartService: CartService) {
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.updateCartStatus();
  }


  private updateCartStatus() {
    this.cartService.cartQuantity.subscribe(
      data => this.cartQuantity = data
    );
  }
}
