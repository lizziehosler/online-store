import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {UserListComponent} from './user/user-list/user-list.component';
import {NewUserComponent} from './user/new-user/new-user.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {EditUserComponent} from './user/edit-user/edit-user.component';


const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'users/new',
    component: NewUserComponent
  },
  {
    path: 'users/edit',
    component: EditUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ]
})
export class AppRoutingModule { }
