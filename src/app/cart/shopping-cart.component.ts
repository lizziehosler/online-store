import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  template: `
    <mat-horizontal-stepper #stepper>
      <mat-step>
        <form>
          <ng-template matStepLabel>Shopping Cart</ng-template>
          <div>
            <button mat-raised-button color="primary" matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>
      <mat-step label="Shipping">
        <form>
          <div>
            <button mat-raised-button color="primary" matStepperPrevious>Back</button>
            <button mat-raised-button color="primary" matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>
      <mat-step>
        <ng-template matStepLabel>Done</ng-template>
        <p>You are now done.</p>
        <div>
          <button mat-raised-button color="primary" matStepperPrevious>Back</button>
        </div>
      </mat-step>
    </mat-horizontal-stepper>
  `,
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {


  constructor() {

  }

  ngOnInit(): void {

  }


}
