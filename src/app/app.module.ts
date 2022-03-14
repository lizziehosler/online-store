import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HomepageComponent} from './homepage/homepage.component';
import {MatDividerModule} from '@angular/material/divider';
import {HeaderComponent} from './component/header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {FooterComponent} from './component/footer/footer.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './services/user.service';
import {UserListComponent} from './admin/user/user-list/user-list.component';
import {MatTableModule} from '@angular/material/table';
import {NewUserComponent} from './admin/user/new-user/new-user.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {CommonModule} from '@angular/common';
import {MatSortModule} from '@angular/material/sort';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {ErrorPopupComponent} from './component/popups/error-popup/error-popup.component';
import {LoginComponent} from './login/login.component';
import {LoginStatusComponent} from './component/header/login-status/login-status.component';
import {Router} from '@angular/router';
import {OktaAuth} from '@okta/okta-auth-js';
import {OKTA_CONFIG, OktaAuthModule} from '@okta/okta-angular';
import myAppConfig from './login/my-app-config';
import {AppRoutingModule} from './app-routing.module';
import {BookService} from './services/book.service';
import {BookListComponent} from './admin/book-list/book-list.component';
import {AddEditBookComponent} from './admin/add-edit-book/add-edit-book.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {SuccessPopupComponent} from './component/popups/success-popup/success-popup.component';
import {MatBadgeModule} from '@angular/material/badge';
import {CartStatusPopupComponent} from './component/popups/cart-status-popup/cart-status-popup.component';
import {ShoppingCartComponent} from './cart/shopping-cart.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTooltipModule} from '@angular/material/tooltip';


const oktaConfig = Object.assign({
  onAuthRequired: (_: undefined, injector: Injector) => {
    const router = injector.get(Router);

    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

const oktaAuth = new OktaAuth(oktaConfig);

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    UserListComponent,
    NewUserComponent,
    ErrorPopupComponent,
    LoginComponent,
    LoginStatusComponent,
    BookListComponent,
    AddEditBookComponent,
    SuccessPopupComponent,
    CartStatusPopupComponent,
    ShoppingCartComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    NgbModule,
    OktaAuthModule,
    _MatMenuDirectivesModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonToggleModule,
    FormsModule,
    MatBadgeModule,
    MatStepperModule,
    MatTooltipModule

  ],
  providers: [
    UserService,
    BookService,
    {provide: OKTA_CONFIG, useValue: {oktaAuth}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
