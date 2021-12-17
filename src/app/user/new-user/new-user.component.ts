import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorPopupComponent} from '../../component/error-popup/error-popup.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-new-user',
  template: `
    <div class="title-group">
      <button mat-raised-button color="primary" [routerLink]="['/users']">
        <mat-icon>arrow_back_ios</mat-icon>
        VIEW ALL USERS
      </button>
      <div class="title">Add a New User</div>

    </div>

    <div class="container">
      <mat-card>
        <form [formGroup]="form" (ngSubmit)="submitForm(form)">
          <mat-form-field appearance="standard" class="full-width">
            <mat-label>First Name</mat-label>
            <input matInput maxlength="15" inputmode="tel" placeholder="Type first name" formControlName="firstName" #firstNameInput>
            <mat-error>First Name is required</mat-error>
            <mat-error *ngIf="(form.get('firstName')).errors?.minlength">
              Name must be at least 2 characters
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="standard" class="full-width">
            <mat-label>Last Name</mat-label>
            <input matInput maxlength="15" inputmode="tel" placeholder="Type last name" formControlName="lastName" #lastNameInput>
            <mat-error>Last Name is required</mat-error>
            <mat-error *ngIf="(form.get('lastName')).errors?.minlength">
              Name must be at least 2 characters
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="legacy" class="full-width">
            <mat-label>Email Address</mat-label>
            <input matInput type="email" formControlName="email" placeholder="Your email">
            <mat-icon matSuffix>mail_outline</mat-icon>
            <mat-error *ngIf="(form.get('email')).errors?.required">Email is required</mat-error>
            <mat-error *ngIf="(form.get('email')).errors?.pattern">Email must be a valid email address</mat-error>
          </mat-form-field>
          <div mat-dialog-actions>
            <button mat-raised-button color="primary" type="submit" [disabled]="!form.valid">Submit</button>
          </div>
        </form>
      </mat-card>
    </div>
  `,
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null, [Validators.required, Validators.minLength(2)]],
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      // password: [null, [Validators.required, Validators.minLength(6)]],
      // confirmPassword: [null, [Validators.required]],
    });
  }

  submitForm(form) {
    this.userService.createUser(this.form.value)
      .subscribe(
        (data) => {
          alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));

        },
        (error: HttpErrorResponse) => {
          this.openDialog();
          console.log(error);
        }
      );
    form.reset();
  }

  openDialog() {
    this.dialog.open(ErrorPopupComponent, {
      data: {
        errorType: 'user',
      },
    });
  }
}
