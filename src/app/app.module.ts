import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
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
import {UserComponent} from './user/user.component';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './services/user.service';
import {UserListComponent} from './user/user-list/user-list.component';
import {MatTableModule} from '@angular/material/table';
import {NewUserComponent} from './user/new-user/new-user.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {CommonModule} from '@angular/common';
import {MatSortModule} from '@angular/material/sort';
import {MatNativeDateModule} from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {ErrorPopupComponent} from './component/error-popup/error-popup.component';
import {EditUserComponent} from './user/edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    UserComponent,
    UserListComponent,
    NewUserComponent,
    ErrorPopupComponent,
    EditUserComponent
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
    _MatMenuDirectivesModule,
    ReactiveFormsModule,
    MatDialogModule

  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
