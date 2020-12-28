import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesNavComponent } from './notes-nav/notes-nav.component';
import { NoteManagerComponent } from './note-manager/note-manager.component';
import { HeaderComponent } from './header/header.component';
import { NoteViewerComponent } from './note-viewer/note-viewer.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { NotesLevelComponent } from './notes-level/notes-level.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LogInComponent } from './log-in/log-in.component';

import { FakeBackendInterceptor } from '../helpers/fake-backend';

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    NotesNavComponent,
    NotesLevelComponent,
    NoteManagerComponent,
    HeaderComponent,
    NoteViewerComponent,
    LogInComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule,
    
    
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),

    AppRoutingModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    FakeBackendInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
