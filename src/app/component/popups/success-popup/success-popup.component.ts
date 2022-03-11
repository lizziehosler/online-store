import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  successType: 'addBook' | 'editBook' | 'deleteBook';
  bookTitle: string;
}

@Component({
  selector: 'app-success-popup',
  template: `
    <div class="success-popup">
      <div *ngIf="data.successType === 'addBook'">
        <h1 mat-dialog-title>{{book}} was successfully created.</h1>
      </div>
      <div *ngIf="data.successType === 'editBook'">
        <h1 mat-dialog-title>{{book}} was successfully edited.</h1>
      </div>
      <div *ngIf="data.successType === 'deleteBook'">
        <h1 mat-dialog-title>{{book}} was successfully deleted.</h1>
      </div>
      <div mat-dialog-actions>
        <button mat-button mat-dialog-close>Close</button>
      </div>
    </div>
  `,
  styleUrls: ['./success-popup.component.scss']
})
export class SuccessPopupComponent implements OnInit {
  book: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.book = this.data.bookTitle;
    }
  }

}
