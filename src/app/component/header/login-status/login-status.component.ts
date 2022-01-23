import {Component, Inject, OnInit} from '@angular/core';
import {OKTA_AUTH} from '@okta/okta-angular';
import {OktaAuth} from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  template: `
    <div class="login-status-header">
      <div *ngIf="isAuthenticated && userFirstName" class="login-status-user-info">
        <div class="name">
          Welcome, {{ userFirstName }}!
        </div>
        <div>
          |
        </div>
      </div>
      <button mat-button *ngIf="!isAuthenticated" routerLink="/login">LOG IN</button>
      <button mat-button *ngIf="isAuthenticated" (click)="logout()">LOG OUT</button>

    </div>
  `,
  styleUrls: ['./login-status.component.scss']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated!: boolean;
  userFirstName?: string;

  constructor(@Inject(OKTA_AUTH)
              public oktaAuth: OktaAuth) {
  }


  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    if (this.isAuthenticated) {
      const userClaims = await this.oktaAuth.getUser();
      this.userFirstName = userClaims.given_name;
    }
  }

  logout() {
    this.oktaAuth.signOut();
  }

}
