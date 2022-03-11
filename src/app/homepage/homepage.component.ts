import {Component, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';
import {Book} from '../common/book';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-homepage',
  template: `
    <h1>T H E &nbsp;&nbsp; B O O K &nbsp;&nbsp; S H O P</h1>
    <div class="title-pic">
      <img src="./assets/images/logo/books.png">
    </div>
    <hr>
    <div fxLayout="row-wrap" class="card-wrapper">
      <div *ngFor="let book of books">
        <mat-card class="homepage-card">
          <mat-card-header>
            <mat-card-title>{{book.name}}</mat-card-title>
            <mat-card-subtitle>{{book.description}}</mat-card-subtitle>
          </mat-card-header>
          <img mat-card-image src="{{book.imageUrl}}" height="400px" (error)="onImageError($event)">
          <mat-card-actions>
            <button mat-button>LIKE</button>
            <button mat-button>SHARE</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  books: Book[];
  dataSource = new MatTableDataSource([]);

  constructor(
    private bookService: BookService
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

  onImageError(event) {
    event.target.src = '../assets/images/covers/placeholder.png';
  }


}
