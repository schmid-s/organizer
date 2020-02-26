import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExtraOptions} from "@angular/router";

import { NoteManagerComponent } from './note-manager/note-manager.component';
import { NotesLevelComponent } from './notes-level/notes-level.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteViewerComponent } from './note-viewer/note-viewer.component';


const routes: Routes = [
  { path: '', redirectTo: '/notes-manager', pathMatch: 'full' },
  { path: 'notes-manager',
    //pathMatch: 'full',
    component: NoteManagerComponent,
    children: [
      { path: ':topicId',
        //pathMatch: 'full',
        component: NotesLevelComponent,
        children: [
          { path: 'notes/new', component: NoteViewerComponent, pathMatch: 'full', data: { newNoteState: true }},
          { path: 'notes/:noteId', component: NoteViewerComponent}
          
        ]
      }
    ]
  },

  // { path: 'notes-manager/:id', component: NotesListComponent, outlet:'note-list'}
  // { path: 'notes/:id', component: NotesListComponent}
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