import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  errorType: 'user';
}

@Component({
  selector: 'app-error-popup',
  template: `
    <div class="error-popup">
      <h1 mat-dialog-title>An error has occurred</h1>
      <div mat-dialog-content *ngIf="data.errorType === 'user'">
        User could not be submitted.
      </div>
      <div mat-dialog-actions>
        <button mat-button mat-dialog-close>Close</button>
      </div>
    </div>
  `,
  styleUrls: ['./error-popup.component.scss']
})
export class ErrorPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
  }

}
