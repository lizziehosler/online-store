import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../common/user';

@Component({
  selector: 'app-user-list',
  template: `
    <h1>Users</h1>
    <p *ngFor="let user of users">
      {{user.firstName}} {{user.lastName}}
    </p>

  `,
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers() {
    this.userService.getUserList().subscribe(
      data => {
        this.users = data;
      }
    );
  }

}
