import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatCheckboxModule, MatTabsModule, MatSnackBarModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatCardModule } from '@angular/material';
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
import { MapsComponent } from './maps/maps.component';
import { AddmapdialogComponent } from './addmapdialog/addmapdialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    AddplayerdialogComponent,
    MapsComponent,
    AddmapdialogComponent
  ],
  entryComponents: [AddplayerdialogComponent, AddmapdialogComponent],
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
    MatCardModule,
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
