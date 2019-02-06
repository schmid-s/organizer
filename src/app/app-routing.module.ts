import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExtraOptions} from "@angular/router";

import { NoteManagerComponent } from './note-manager/note-manager.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteViewerComponent } from './note-viewer/note-viewer.component';


const routes: Routes = [
  { path: '', redirectTo: '/notes-manager', pathMatch: 'full' },
  //{ path: 'notes-manager', component: NoteManagerComponent},

  { path: 'notes-manager', 
    component: NoteManagerComponent,
    children: [
      
      { path: ':topicId', component: NotesListComponent},
      { path: 'notes/:noteId', component: NoteViewerComponent, outlet:"note-view", pathMatch: 'full'}
      
       
    ]
  },

  //{ path: 'notes-manager/:id', component: NotesListComponent, outlet:'note-list'}
  //{ path: 'notes/:id', component: NotesListComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes, {paramsInheritanceStrategy: 'always'}) ]
})
export class AppRoutingModule { }

/*
export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
};

export const Routing = RouterModule.forRoot(routes, routingConfiguration);
*/