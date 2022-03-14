import {Component, OnInit, ViewChild} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Book} from '../../common/book';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {GenreService} from '../../services/genre.service';
import {first} from 'rxjs/operators';
import {ErrorPopupComponent} from '../../component/popups/error-popup/error-popup.component';
import {MatDialog} from '@angular/material/dialog';
import {SuccessPopupComponent} from '../../component/popups/success-popup/success-popup.component';

@Component({
  selector: 'app-book-list',
  template: `
    <div class="title-group-admin">
      <div class="title">Book Inventory Manager</div>
    </div>

    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8 book-table">
      <!-- Image Column -->
      <ng-container matColumnDef="image">
        <th mat-header-cell *matHeaderCellDef>
          <button mat-raised-button color="primary" [routerLink]="['/admin/books/new']">
            <mat-icon>add_box</mat-icon>
            ADD NEW BOOK
          </button>
        </th>
        <td mat-cell *matCellDef="let book"><img src="{{book.imageUrl}}" height="100" (error)="onImageError($event)"></td>
      </ng-container>

      <!-- Name Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Title</th>
        <td mat-cell *matCellDef="let book">{{book.name}}</td>
      </ng-container>

      <!-- SKU Column -->
      <ng-container matColumnDef="sku">
        <th mat-header-cell *matHeaderCellDef>SKU</th>
        <td mat-cell *matCellDef="let book">{{book.sku}}</td>
      </ng-container>

      <!-- Description Column -->
      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef>Description</th>
        <td mat-cell *matCellDef="let book">{{book.description}}</td>
      </ng-container>

      <!-- Price Column -->
      <ng-container matColumnDef="price">
        <th mat-header-cell *matHeaderCellDef>Price</th>
        <td mat-cell *matCellDef="let book">{{book.unitPrice}}</td>
      </ng-container>

      <!-- Quantity Column -->
      <ng-container matColumnDef="quantity">
        <th mat-header-cell *matHeaderCellDef>Quantity</th>
        <td mat-cell *matCellDef="let book">{{book.unitsInStock}}</td>
      </ng-container>

      <!-- Genre Column -->
      <!--      <ng-container matColumnDef="genre">-->
      <!--        <th mat-header-cell *matHeaderCellDef>Genre</th>-->
      <!--        <td mat-cell *matCellDef="let book">{{book._links.genre.href}}</td>-->
      <!--      </ng-container>-->


      <!-- Edit Column -->
      <ng-container matColumnDef="edit">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let book">
          <mat-icon (click)="routeToEditBook(book.id)" style="cursor:pointer;" matTooltip="Edit Book">edit</mat-icon>
        </td>
      </ng-container>

      <!-- Delete Column -->
      <ng-container matColumnDef="delete">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let book">
          <mat-icon (click)="deleteBook(book.id, book.name)" style="cursor:pointer;" matTooltip="Delete Book">delete</mat-icon>
        </td>
      </ng-container>


      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>`,
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[];
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['image', 'name', 'sku', 'description', 'price', 'quantity', 'edit', 'delete'];
  @ViewChild(MatTable) table: MatTable<Book>;


  constructor(
    private bookService: BookService,
    private genreService: GenreService,
    private router: Router,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.listBooks();
  }

  listBooks() {
    this.bookService.getBookList().subscribe(
      data => {
        this.books = data;
        this.dataSource.data = data;
      }
    );

  }

  routeToEditBook(id: number) {
    this.router.navigate([`admin/books/edit/${id}`]);
  }

  deleteBook(id: number, name: string) {
    this.bookService.deleteBook(id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.deleteBookSuccess(name);
          this.listBooks();
        },
        error: error => {
          this.deleteBookError();
        }
      });
  }

  onImageError(event) {
    event.target.src = '../assets/images/covers/placeholder.png';
  }

  private deleteBookSuccess(title) {
    this.dialog.open(SuccessPopupComponent, {
      data: {
        successType: 'deleteBook',
        bookTitle: title,
      },
    });
  }

  private deleteBookError() {
    this.dialog.open(ErrorPopupComponent, {
      data: {
        errorType: 'deleteBook',
      },
    });
  }


}
