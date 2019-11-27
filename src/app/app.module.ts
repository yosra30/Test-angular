import { PlaceholderDirective } from './placeholder.directive';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ContainerComponent } from './container/container.component';
import { ModalItemComponent } from './modal-item/modal-item.component';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemCardComponent,
    ItemListComponent,
    ContainerComponent,
    ModalItemComponent,PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,NgxPaginationModule,
    HttpClientModule,FormsModule,
    InfiniteScrollModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalItemComponent]

})
export class AppModule { }
