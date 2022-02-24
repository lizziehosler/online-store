import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {ErrorPopupComponent} from '../component/error-popup/error-popup.component';
import {BookService} from '../services/book.service';
import {GenreService} from '../services/genre.service';
import {Genre} from '../common/genre';

@Component({
  selector: 'app-add-edit-book',
  template: `
    <div class="title-group">
      <button mat-raised-button color="primary" [routerLink]="['/admin/books']">
        <mat-icon>arrow_back_ios</mat-icon>
        VIEW ALL BOOKS
      </button>
      <div class="title" *ngIf="isAddMode">Add a New Book</div>
      <div class="title" *ngIf="!isAddMode">Edit Book</div>

    </div>

    <div class="container">
      <mat-card>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="standard" class="full-width">
            <mat-label>Title</mat-label>
            <input matInput placeholder="Book title" formControlName="name" #nameInput>
            <mat-error>Title is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="standard" class="full-width">
            <mat-label>SKU</mat-label>
            <input matInput formControlName="sku" #skuInput>
            <mat-error *ngIf="(form.controls['sku'].errors?.required)">SKU is required</mat-error>
            <mat-error *ngIf="(form.controls['sku'].errors?.pattern)">
              SKU must only contain numbers
            </mat-error>
          </mat-form-field>


          <mat-form-field appearance="standard" class="full-width">
            <mat-label>Description</mat-label>
            <input matInput formControlName="description" #descriptionInput>
          </mat-form-field>

          <mat-form-field appearance="standard" class="smaller-width">
            <mat-label>Price per unit</mat-label>
            <input matInput type="number" step="0.01" min="0" formControlName="unitPrice" #unitPriceInput>
            <span matPrefix>$&nbsp;</span>

            <mat-error *ngIf="(form.controls['unitPrice'].errors?.required)">Price is required</mat-error>
            <mat-error *ngIf="(form.controls['unitPrice'].errors?.pattern)">
              Price must be in valid dollar format
            </mat-error>
          </mat-form-field>

          <!--          <mat-form-field appearance="standard" class="smaller-width">-->
          <!--            <mat-label>Active?</mat-label>-->
          <!--            <mat-select formControlName="active">-->
          <!--              <mat-option value="yes">Yes</mat-option>-->
          <!--              <mat-option value="no">No</mat-option>-->
          <!--            </mat-select>-->
          <!--          </mat-form-field>-->

          <mat-form-field appearance="standard" class="smaller-width">
            <mat-label>Quantity of units in stock</mat-label>
            <input matInput type="number" formControlName="unitsInStock" #unitsInStockInput>
            <mat-error *ngIf="(form.controls['unitsInStock'].errors?.required)">Units in stock is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="standard" class="smaller-width">
            <mat-label>Genre</mat-label>
            <mat-select formControlName="genre">
              <mat-option *ngFor="let genre of genres" value="genre._links.self.href">
                {{genre.name}}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <!--          <div class="form-group">-->
          <!--            <label for="file">Choose File</label>-->
          <!--            <input type="file"-->
          <!--                   id="file">-->
          <!--          </div>-->

          <div mat-dialog-actions>
            <button mat-raised-button color="primary" type="submit" [disabled]="loading">Submit</button>
          </div>
        </form>
      </mat-card>
    </div>
  `,
  styleUrls: ['./add-edit-book.component.scss']
})
export class AddEditBookComponent implements OnInit {
  form: FormGroup;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  genres: Genre[];
  genreName: string;
  id: number;
  fileToUpload: File | null = null;


  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private genreService: GenreService
  ) {
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;

    this.createForm();

    this.getGenres();
    this.getGenreofBook(this.id);

    if (!this.isAddMode) {
      this.bookService.getBookById(this.id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
    }


  }

  private createForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      sku: [null, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      description: [null],
      unitPrice: [null, [Validators.required]],
      // active: [null, [Validators.required]],
      unitsInStock: [null, [Validators.required]],
      genre: new FormControl(this.genreName)

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
      this.createBook(this.form);
    } else {
      this.editBook(this.form);
    }
  }

  private createBook(form) {
    this.bookService.createBook(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));
          this.router.navigate(['books']);
        },
        error: error => {
          this.addBookError();
          this.loading = false;
        }
      });
  }


  private editBook(form) {
    this.bookService.updateBook(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          alert('SUCCESS!! :-)\n\n' + JSON.stringify(form.value, null, 4));
          this.router.navigate(['books']);
        },
        error: error => {
          this.editBookError();
          this.loading = false;
        }
      });
  }

  private addBookError() {
    this.dialog.open(ErrorPopupComponent, {
      data: {
        errorType: 'addBook',
      },
    });
  }

  private editBookError() {
    this.dialog.open(ErrorPopupComponent, {
      data: {
        errorType: 'editBook',
      },
    });
  }

  getGenres() {
    this.genreService.getGenreList().subscribe(
      genreData => {
        this.genres = genreData;
      }
    );
  }

  getGenreofBook(id: number) {
    return this.bookService.getGenreByBookId(id).subscribe(
      genre => {
        this.genreName = genre.name;

      }
    );
    ;
  }

}

