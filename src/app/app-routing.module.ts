import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {OktaAuthGuard, OktaCallbackComponent} from '@okta/okta-angular';
import {LoginComponent} from './login/login.component';
import {NewUserComponent} from './admin/user/new-user/new-user.component';
import {NgModule} from '@angular/core';
import {UserListComponent} from './admin/user/user-list/user-list.component';
import {AdminProductsListComponent} from './admin/admin-products-list/admin-products-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'users/new',
    component: NewUserComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'users/edit/:id',
    component: NewUserComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'login/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'admin/products',
    component: AdminProductsListComponent
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
