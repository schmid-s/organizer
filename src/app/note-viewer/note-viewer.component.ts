import { Component, OnInit, QueryList, ViewChildren, AfterViewInit, ElementRef } from '@angular/core';
import { Note } from '../note';
import {ActivatedRoute, Router, ParamMap, NavigationEnd} from '@angular/router';

import { Location} from '@angular/common';
import { NoteService} from '../note.service';
import { Topic } from '../topic';
import { tap, switchMap } from 'rxjs/operators';
import { throwError, iif, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-note-viewer',
  templateUrl: './note-viewer.component.html',
  styleUrls: ['./note-viewer.component.scss']
})
export class NoteViewerComponent implements OnInit, AfterViewInit {

  topicId: number;
  topic: Topic;
  noteId: number;
  note?: Note = null;

  @ViewChildren("titleInput") 
  titleInput : QueryList<ElementRef>;

  @ViewChildren("textInput") 
  textInput : QueryList<ElementRef>;

  noteTextEmpty: boolean = false;
  noteTitleEmpty: boolean = false;
  newNoteState: boolean;
  deleteDialog: boolean = false;

  notesSubscription: Subscription;
  titleInputChangesSubscription: Subscription;

  // parentId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private location: Location
  ) {
    
  }

  ngOnInit() {
    console.log('this.note is '+this.note);
    console.log('init-----------------------------------------------------------------');
    this.getNotesOnNewTopic();
  }

  ngAfterViewInit() {
    this.manageFocusOnInputs();
    
  }

  ngOnDestroy() {
    console.log('destroy-----------------------------------------------------------------');

    // await this.checkForEmptyNoteTitle();

    this.notesSubscription.unsubscribe();
    this.titleInputChangesSubscription.unsubscribe();
  }

/////////////////////////////////////////////////////


caseParamsHasNoNew(params){
  this.noteId = +params.get('noteId');
  console.log("Params Has No New")
  console.log("fetching note with id "+this.noteId )
  // if(this.note) await this.checkForEmptyNoteTitle();
  return this.noteService.getNote(this.noteId)
}

caseParamsHasNew(params){
  console.log("caseParamsHasNew")
  return of(params)
}

getNotesOnNewTopic(){
  this.notesSubscription = this.route.paramMap.pipe(
    tap((params) => this.topicId = +params.get('topicId')),
    switchMap(params =>
             iif(() => this.getCurrentRouteEnd() == 'new',
              of(params),
              this.caseParamsHasNoNew(params)
              )
    )
  ).subscribe( (output) => {
   console.log('route ending is = '+this.route.snapshot.url[this.route.snapshot.url.length -1]);

    if(output instanceof Note){

      if(this.noteId) {
        this.note = output;      
      } 
    }
    else if(this.instanceOfParamMap(output)){
      this.createNewNote();
    }
    else{
      throwError;
    }
  });
}

  instanceOfParamMap(object: any): object is ParamMap {
    return 'keys' in object;
  }

  getCurrentRouteEnd() {
    return this.route.snapshot.url[this.route.snapshot.url.length -1].path;
  }

  createNewNote(): void {
    console.log('create new note');
    this.note = new Note('');
    this.newNoteState = true;
    console.log('this.note.title is : '+this.note.title);
    this.checkIfInputsEmpty();
  }

  deleteNote(): Promise<any> {
    let deleteMessage;
    deleteMessage = this.noteService.removeNote(this.noteId);
    console.log(deleteMessage);
    return deleteMessage;
  }
  
/////////////////////////////////////////////////////////////

  // gets the current id in the url in order to subscibeToTopic
  // and ultimately get the current topic and noteslist
  subscribeToCurrentNote() : void{
    this.noteService.getCurrentNote().subscribe(note => this.note = note);
  }

  checkIfInputsEmpty(){
    this.isNoteTitleEmpty();
    this.isNoteTextEmpty();
  }

  /* async checkForEmptyNoteTitle() {
    if(this.note.title === '') {
      await this.noteService.updateNote(this.noteId, {title : 'Unlabeled Note'})
    }
  } */

  isNoteTextEmpty() : void{
    if (!this.note.text) {
      this.noteTextEmpty = true;
      console.log(this.note);
      console.log('this.noteTextEmpty = true');
    } else {
      this.noteTextEmpty = false;
      console.log(this.note);
      console.log('this.noteTextEmpty = false');

    }
  }

  isNoteTitleEmpty() : void{
    if (!this.note.title) {
      this.noteTitleEmpty = true;
      console.log('this.noteTitleEmpty = true');
    } else {
      this.noteTitleEmpty = false;
      console.log('this.noteTitleEmpty = false');
    }
  }

  addNoteToDBOnFirstInput(){
    if(this.newNoteState){
      let returnedNoteId;
      this.noteService.addNote({title : this.note.title, topicId : this.topicId})
        .then( (id) => {
          returnedNoteId = id;
          this.newNoteState = false;
          console.log("creating note, now routing");
          this.router.navigate(['notes-manager', this.topicId, 'notes', returnedNoteId]);
        }
      );

    }
    else{
      this.noteService.updateNote(this.noteId, {title : this.note.title})
    }
  }

  updateNoteByTextField() {
    this.noteService.updateNote(this.noteId, {text : this.note.text})
  }

  manageFocusOnInputs() {
    // titleInput element focussed when new Topic is accessed
    if(this.getCurrentRouteEnd() == 'new') {
      this.titleInput.first.nativeElement.focus();
    }

    // makes focus stay on titleImput element even when route has changed:
    this.titleInputChangesSubscription = this.titleInput.changes.subscribe((list: QueryList<ElementRef>) => {
      if (list.length > 0) {
        list.first.nativeElement.focus();
      }
    });
  }

  /* 
    Hintergrund zur Logik beim Fokus:

    Der Fokus kann erst auf ngAfterViewInit gesetzt werden, wenn alle Dom Elemente geladen sind.
    Im Fall der route endend auf /new funktioniert es, wenn es direkt in ngAfter ViewInit hook angegeben ist.

    Im Fall der Route mit Parametern der Note Ids funktioniert es nicht, weil das Laden der DOM-Elemente
    zusätzlich durch ein *ngIf verzögert wird. 
   */

  /*
  setFocusToTitle(){
    console.log("setFocusToTitle triggered");
    (document.activeElement as HTMLElement).blur();
    this.titleInput.first.nativeElement.focus();
  }
  */
}
