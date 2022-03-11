import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `

    <mat-toolbar color="primary">
      <div class="content">&copy;{{currentYear}} Elizabeth Hosler Batz</div>
    </mat-toolbar>

  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear: number;

  constructor() {
  }

  ngOnInit(): void {
    const date = new Date();
    this.currentYear = date.getFullYear();
  }

}
