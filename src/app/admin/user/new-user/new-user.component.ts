import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {ErrorPopupComponent} from '../../../component/popups/error-popup/error-popup.component';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-new-user',
  template: `
    <div class="title-group">
      <button mat-raised-button color="primary" [routerLink]="['/users']">
        <mat-icon>arrow_back_ios</mat-icon>
        VIEW ALL USERS
      </button>
      <div class="title" *ngIf="isAddMode">Add a New User</div>
      <div class="title" *ngIf="!isAddMode">Edit User</div>

    </div>

    <div class="container">
      <mat-card>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
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
            <button mat-raised-button color="primary" type="submit" [disabled]="loading">Submit</button>
          </div>
        </form>
      </mat-card>
    </div>
  `,
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;

    this.createForm();

    if (!this.isAddMode) {
      this.userService.getUserById(this.id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
    }
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


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser(this.form);
    } else {
      this.editUser(this.form);
    }
  }

  private createUser(form) {
    this.userService.createUser(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));
          this.router.navigate(['users']);
        },
        error: error => {
          this.addUserError();
          this.loading = false;
        }
      });
  }


  private editUser(form) {
    this.userService.updateUser(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));
          this.router.navigate(['users']);
        },
        error: error => {
          this.editUserError();
          this.loading = false;
        }
      });
  }

  private addUserError() {
    this.dialog.open(ErrorPopupComponent, {
      data: {
        errorType: 'addUser',
      },
    });
  }

  private editUserError() {
    this.dialog.open(ErrorPopupComponent, {
      data: {
        errorType: 'editUser',
      },
    });
  }
}
