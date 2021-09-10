import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-homepage',
  template: `
    <h1>Let's buy some stuff!</h1>
    <hr>
  `,
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
