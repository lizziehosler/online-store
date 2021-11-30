import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HomepageComponent} from './homepage/homepage.component';
import {MatDividerModule} from '@angular/material/divider';
import {HeaderComponent} from './header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {FooterComponent} from './footer/footer.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {UserComponent} from './user/user.component';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './services/user.service';
import {UserListComponent} from './user/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    UserComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule,
    NgbModule,
    _MatMenuDirectivesModule,
    MatMenuModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
