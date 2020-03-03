import { Component, OnInit, ElementRef, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { Note } from '../note';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';

import { Location} from '@angular/common';
import { NoteService} from '../note.service';
import { Topic } from '../topic';
import { tap, switchMap } from 'rxjs/operators';
import { throwError, iif, of } from 'rxjs';

@Component({
  selector: 'app-note-viewer',
  templateUrl: './note-viewer.component.html',
  styleUrls: ['./note-viewer.component.scss']
})
export class NoteViewerComponent implements OnInit {

  topicId: number;
  topic: Topic;
  noteId: number;
  note?: Note;

  //@ViewChild("noteTitle", {static: false}) titleInput: ElementRef;
  @ViewChildren("noteTitle") titleInput: QueryList<ElementRef>;

  noteTextEmpty: boolean = false;
  noteTitleEmpty: boolean = false;
  newNoteState: boolean;

  // parentId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private location: Location
  ) {
    /*
    const parentActivatedRoute = router.routerState.parent(route);
    this.parentId = parentActivatedRoute.params.map(routeParams => routeParams.id);
    */
  }

  ngOnInit() {
    //this.actOnRouteParams();
    this.getNotesOnNewTopic();

  }

  ngAfterViewInit(){
    if(this.newNoteState) this.setFocusToTitleInput();
    //this.isNoteTitleEmpty();
    //this.isNoteTextEmpty();
  }

/////////////////////////////////////////////////////

setFocusToTitleInput(){
  console.log('setting focus');
  if (this.titleInput.length > 0) {
    console.log("this.titleInput.first.nativeElement is "+this.titleInput.first.nativeElement);
    this.titleInput.first.nativeElement.focus();
    //sdfgsdgthis.titleInput.first.nativeElement.style.backgroundColor = 'blue';
  }
}

caseParamsHasNoNew(params){
  this.noteId = +params.get('noteId');
  console.log("Params Has No New")
  console.log("fetching note with id "+this.noteId )
  return this.noteService.getNote(this.noteId)
}

caseParamsHasNew(params){
  console.log("caseParamsHasNew")
  return of(params)
}

getNotesOnNewTopic(){
  this.route.paramMap.pipe(
    tap((params) => this.topicId = +params.get('topicId')),
    switchMap(params =>
             iif(() => this.getCurrentRouteEnd() == 'new',
              of(params),
              this.caseParamsHasNoNew(params)
              )
              /*
              switchMap(params => 
              
                iif(() => params.has('new'),
                this.caseParamsHasNew(params),
                this.caseParamsHasNoNew(params)
                )
              )
              */
            
    )
  ).subscribe( (output) => {
    /*
    console.log('keys after subscribe = '+output.keys);
    console.log('route.data = '+this.route.data);
    console.log('newNoteState = '+this.route.snapshot.data.newNoteState);
    console.log('url is = '+this.route.snapshot['_routerState'].url);
    console.log('url by router = '+this.router.url.lastIndexOf('new'));
    
    console.log('url is = '+this.route.snapshot.url.lastIndexOf.toString);
    console.log('queryParams = '+this.route.snapshot.queryParams['new']);
    console.log('check for routerstate = '+this.route.snapshot['_routerState'].url.lastIndexOf('new'));
    */
   console.log('route ending is = '+this.route.snapshot.url[this.route.snapshot.url.length -1]);
   //console.log('url by router 2= '+this.router.url.includes('new'));

    if(output instanceof Note){
      if(this.noteId) this.note = output;
      //console.log('this.note = '+this.note);
    } 
    else if(this.instanceOfParamMap(output)){
      this.createNewNote();
      this.checkIfInputsEmpty();
      //this.setFocusToTitleInput();
    }
    else{
      throwError;
    }
    
   /*
   else{
     this.createNewNote();
   }
   */
  });
}

  instanceOfParamMap(object: any): object is ParamMap {
    return 'keys' in object;
  }

  getCurrentRouteEnd(){
    return this.route.snapshot.url[this.route.snapshot.url.length -1].path;
  }

  createNewNote(){
    console.log('create new note');
    this.note = new Note('');
    this.newNoteState = true;
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

  isNoteTextEmpty() : void{
    if (this.note.text == '') {
      this.noteTextEmpty = true;
    } else {
      this.noteTextEmpty = false;
    }
  }

  isNoteTitleEmpty() : void{
    if (this.note.title == '') {
      this.noteTitleEmpty = true;
    } else {
      this.noteTitleEmpty = false;
    }
  }

  addNoteToDBOnFirstInput(){
    let returnedNoteId;
    if(this.newNoteState){
      this.noteService.addNote({title : this.note.title, topicId : this.topicId})
        .then( (id) => {
          returnedNoteId = id;
          this.newNoteState = false;
          console.log("creating note, now routing");
          //this.router.navigate(['notes-manager/2/notes/', returnedNoteId]);
        }
      );
      
    }
    
  }
}
