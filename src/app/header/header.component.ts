import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <a [routerLink]="['/homepage']" mat-flat-button color="primary" class="home-button">{{title}}</a>
      <div class="spacer"> |</div>
      <mat-icon class="example-icon" aria-hidden="false" aria-label="Example user verified icon">verified_user</mat-icon>
      <div class="admin-menu">
        <button mat-button [matMenuTriggerFor]="menu">ADMIN</button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item>Users</button>
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
