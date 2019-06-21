import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatCheckboxModule, MatTabsModule, MatSnackBarModule, MatFormFieldModule, MatDialogModule, MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PlayersComponent } from './players/players.component';
import { RouterModule } from '@angular/router';
import { StorageModule } from '@ngx-pwa/local-storage';
import { FormsModule } from '@angular/forms';
import { AddplayerdialogComponent } from './addplayerdialog/addplayerdialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    AddplayerdialogComponent
  ],
  entryComponents: [AddplayerdialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSnackBarModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    StorageModule.forRoot({
      IDBNoWrap: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
