import { Component, OnInit } from '@angular/core';
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
  noteTextEmpty: boolean = false;
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


/////////////////////////////////////////////////////
/*
  actOnRouteParams(){
    this.route.paramMap.pipe(
      iif (params => params.has('new'),

      )
        
      

    )
    
    
    
    .subscribe( params => {
      this.topicId = +params.get('topicId');
      if(params.has('new')){
        console.log('this.noteId = '+this.noteId);
        this.note = new Note('');
      }
      else if(params.has('noteId')){
        this.noteId = +params.get('noteId');
        console.log('this.noteId = '+this.noteId);
        this.note = this.noteService.getNote(this.noteId);
      }
      
    })
  }
*/
/*
  getNotesOnNewTopic(){
    this.route.paramMap.pipe(
      iif(() => true, 
      this.noteService.getNote(this.noteId),
      true)(
      
    )).subscribe( (note) => {
      if(this.newNoteState == true){
        this.createNewNote();
      }
      else {
        if(this.noteId) this.note = note;
        console.log('this.note = '+this.note);
      }
    });
  }
*/
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
    switchMap(params => {
              console.log("________________________________________________");
     
              
              if(this.getCurrentRouteEnd() == 'new'){
              return this.caseParamsHasNew(params)
              } else{
              return this.caseParamsHasNoNew(params)
              }
            }
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
      console.log('this.note = '+this.note);
    } 
    else if(this.instanceOfParamMap(output)){
      this.createNewNote();
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
/*
  getNotesOnNewTopic(){
    this.route.paramMap.pipe(
      switchMap(params => {
        this.topicId = +params.get('topicId');
        if(params.has('new')){
          console.log('this.noteId = '+this.noteId);
          return of("")
        }
        else if(params.has('noteId')){
          this.noteId = +params.get('noteId');
          console.log('this.noteId = '+this.noteId);
          return this.noteService.getNote(this.noteId);
        }
      })
    ).subscribe( (note) => {
      if(note == ""){
        this.createNewNote;
      }
      else {
        if(this.noteId) this.note = note;
        console.log('this.note = '+this.note);
      }
    });
  }
  */
  createNewNote(){
    console.log('create new note');
    let note = new Note('');

    return note;
  }

  

/*
  //gets the current id in the url in order to subscibeToTopic
  // and ultimately get the up to date topic and noteslist
  subscribeToRouteId() : void{
    let noteId: number;
    this.route.paramMap.subscribe((params) => {
      console.log('topic id is now: ' + this.getTopic());
      noteId = +params.get('id1');
      this.subscribeToNote(this.getTopic(), noteId);
      console.log('note id is now: ' + noteId);
    });
  }

  subscribeToNote(topicId: number, noteId : number) : void{
    //console.log('subscribeToTopic id is now: ' +this.id);
    // ! The JavaScript + operator converts the string to a number, which is what a hero id should be
    this.noteService.getNote(topicId, noteId).subscribe(note => {
      this.onNewNote(note);
      //console.log('topic is now: ' + topic.id);
    });
  }

  onNewNote(note){
    this.note = note;
    //this.notesList = topic.notesList;
    console.log(this.note);
  }
*/
/////////////////////////////////////////////////////////////

  // gets the current id in the url in order to subscibeToTopic
  // and ultimately get the current topic and noteslist
  subscribeToCurrentNote() : void{
    this.noteService.getCurrentNote().subscribe(note => this.note = note);
  }

  /*
  getTopicId(): void {
    this.route.paramMap.subscribe(params => {
      this.topicId = params.get('topicId');
      console.log('note viewer topic id: ' + this.topicId );
      this.subscribeToTopic();
  });
  }
  */
  /*
  subscribeToTopic(): void {
    this.noteService.getCurrentTopic().subscribe(topic => {
      this.topic = topic;
      console.log('viewer topic name is now: ' + this.topic.id);
      this.getNoteId();
    });
  }
  */

  /*
  getNoteId(): void{
    this.route.paramMap.subscribe(params => {
      this.noteId = +params.get('noteId');
      
      console.log('note viewer note id: ' + this.noteId );
      this.onNewTopic(this.noteId);
    });
  }
  */

/*
 getNoteId(): number{
  this.route.paramMap.subscribe(params => {
    this.noteId = +params.get('noteId');
  });
*/
  isNoteTextEmpty() : void{
    if (this.note.text == '') {
      this.noteTextEmpty = true;
      console.log("eeeempty");
    } else {
      this.noteTextEmpty = false;
    }
  }
  /*
  onNewTopic(noteId: number) {
    this.note = this.topic.notesList[noteId - 11];
    this.note.id = this.topic.notesList[noteId - 11].id;
    this.note.title = this.topic.notesList[noteId - 11].title;
    this.note.text = this.topic.notesList[noteId - 11].text;
    // console.log(this.note.id);
  }
  */
  
}
