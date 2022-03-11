import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {OktaAuthGuard, OktaCallbackComponent} from '@okta/okta-angular';
import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {BookListComponent} from './admin/book-list/book-list.component';
import {AddEditBookComponent} from './admin/add-edit-book/add-edit-book.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  // {
  //   path: 'users',
  //   component: UserListComponent,
  //   canActivate: [OktaAuthGuard]
  // },
  // {
  //   path: 'users/new',
  //   component: NewUserComponent,
  //   canActivate: [OktaAuthGuard]
  // },
  // {
  //   path: 'users/edit/:id',
  //   component: NewUserComponent,
  //   canActivate: [OktaAuthGuard]
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'admin/books',
    component: BookListComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'admin/books/new',
    component: AddEditBookComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'admin/books/edit/:id',
    component: AddEditBookComponent,
    canActivate: [OktaAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}

  ]
})
export class AppRoutingModule {
}
