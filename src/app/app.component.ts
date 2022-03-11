import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="wrapper">
      <app-header [title]="title"></app-header>
      <div fxFlex="1" class="mat-app-background">
        <router-outlet></router-outlet>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Online Store';
}
