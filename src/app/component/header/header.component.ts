import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <a [routerLink]="['']" mat-flat-button color="primary" class="home-button">{{title}}</a>
      <div class="spacer"> |</div>
      <mat-icon>shopping_basket</mat-icon>
      <div class="admin-menu">
        <app-login-status></app-login-status>
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
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;


  constructor() {
  }

  ngOnInit(): void {

  }


}
