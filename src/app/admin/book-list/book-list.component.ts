import {Component, OnInit, ViewChild} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Book} from '../../common/book';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {GenreService} from '../../services/genre.service';

@Component({
  selector: 'app-book-list',
  template: `
    <div class="title-group">
      <div class="title">Books</div>
      <button mat-raised-button color="primary" [routerLink]="['/admin/books/new']">
        <mat-icon>add_box</mat-icon>
        ADD NEW BOOK
      </button>
    </div>

    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8 book-table">
      <!-- Image Column -->
      <ng-container matColumnDef="image">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let book"><img src="{{book.imageUrl}}" height="100"></td>
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

      <!-- Genre Column -->
      <ng-container matColumnDef="genre">
        <th mat-header-cell *matHeaderCellDef>Genre</th>
        <td mat-cell *matCellDef="let book">{{this.getGenre(book.id)}}</td>
      </ng-container>


      <!-- Edit Column -->
      <ng-container matColumnDef="edit">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let book">
          <mat-icon (click)="routeToEditBook(book.id)" style="cursor:pointer;">edit</mat-icon>
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
  displayedColumns: string[] = ['image', 'name', 'sku', 'description', 'price', 'genre', 'edit'];
  @ViewChild(MatTable) table: MatTable<Book>;
  currentGenreId: number;


  constructor(
    private bookService: BookService,
    private genreService: GenreService,
    private router: Router
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

  getGenre(id: number) {
    console.log(this.bookService.getGenreByBookId(id));
    return this.bookService.getGenreByBookId(id);
    ;
  }

}
