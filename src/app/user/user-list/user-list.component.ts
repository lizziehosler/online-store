import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../common/user';
import {MatTable, MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="title">Users</div>
    <!--    <div class="demo-button-container">-->
    <!--      <button mat-raised-button (click)="addData()" class="demo-button">-->
    <!--        Add data-->
    <!--      </button>-->
    <!--      <button-->
    <!--        mat-raised-button-->
    <!--        [disabled]="!dataSource.length"-->
    <!--        (click)="removeData()"-->
    <!--        class="demo-button">-->
    <!--        Remove data-->
    <!--      </button>-->
    <!--    </div>-->

    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8 demo-table">
      <!-- Id Column -->
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let user">{{user.id}}</td>
      </ng-container>

      <!-- First Name Column -->
      <ng-container matColumnDef="firstName">
        <th mat-header-cell *matHeaderCellDef>First Name</th>
        <td mat-cell *matCellDef="let user">{{user.firstName}}</td>
      </ng-container>

      <!-- Last Name Column -->
      <ng-container matColumnDef="lastName">
        <th mat-header-cell *matHeaderCellDef>Last Name</th>
        <td mat-cell *matCellDef="let user">{{user.lastName}}</td>
      </ng-container>

      <!-- Email Column -->
      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef>Email</th>
        <td mat-cell *matCellDef="let user">{{user.email}}</td>
      </ng-container>


      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

  `,
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email'];
  dataSource = new MatTableDataSource([]);
  users: User[];
  @ViewChild(MatTable) table: MatTable<User>;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.listUsers();

  }

  listUsers() {
    this.userService.getUserList().subscribe(
      data => {
        this.users = data;
        this.dataSource.data = data;
      }
    );
  }


}
