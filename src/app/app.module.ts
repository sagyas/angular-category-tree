import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryListItemComponent } from './category-list/category-list-item/category-list-item.component';
import { CategoryListService } from './category-list/category-list-service/category-list.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    CategoryListItemComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MatIconModule,
    FormsModule,
  ],
  providers: [CategoryListService, ...environment.providers],
  bootstrap: [AppComponent],
})
export class AppModule {}
