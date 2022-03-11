import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {OKTA_AUTH} from '@okta/okta-angular';
import {OktaAuth} from '@okta/okta-auth-js';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <!--      <mat-icon [routerLink]="['']" class="home-button">home</mat-icon>-->
      <a [routerLink]="['']" class="home-button">
        <img src="././assets/images/logo/book.png" height="60" alt="book"/>
      </a>
      <div class="spacer"> |</div>
      <mat-icon>shopping_basket</mat-icon>
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


  constructor(@Inject(OKTA_AUTH)
              public oktaAuth: OktaAuth) {
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }


}
