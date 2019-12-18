import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import {ActivatedRoute, Router} from '@angular/router';

import { Location} from '@angular/common';
import { NoteService} from '../note.service';
import { Topic } from '../topic';

@Component({
  selector: 'app-note-viewer',
  templateUrl: './note-viewer.component.html',
  styleUrls: ['./note-viewer.component.scss']
})
export class NoteViewerComponent implements OnInit {

  topicId: number;
  topic: Topic;
  noteId: number;
  note: Note;
  noteTextEmpty: Boolean = false;

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
    this.getTopicId();
  }


// muss ich hier wirklich subscriben oder reicht denn nicht
// eine reine zuweisung des werts der parent id um die note zu holen?
// die anzeige der richtigen notelist managet ja die noteslist,
// die die url bestimmt...wenn diese sich ändert weiß das aber
// der notes-viewr trotzdem nicht-> ausprobieren:



/////////////////////////////////////////////////////
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
      //console.log('topic is now: ' + topic.name);
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


  getTopicId(): void {
    this.route.paramMap.subscribe(params => {
      this.topicId = +params.get('topicId');
      console.log('note viewer topic id: ' + this.topicId );
      this.subscribeToTopic();
  });
  }

  subscribeToTopic(): void {
    this.noteService.getTopic(this.topicId).subscribe(topic => {
      this.topic = topic;
      console.log('viewer topic name is now: ' + this.topic.name);
      this.getNoteId();
    });
  }

  getNoteId(): void{
    this.route.paramMap.subscribe(params => {
      this.noteId = +params.get('noteId');
      
      console.log('note viewer note id: ' + this.noteId );
      this.onNewTopic(this.noteId);
    });
  }

  isNoteTextEmpty() : void{
    if (this.note.text == '') {
      this.noteTextEmpty = true;
      console.log("eeeempty");
    } else {
      this.noteTextEmpty = false;
    }
  }
  
  onNewTopic(noteId: number) {
    this.note = this.topic.notesList[noteId - 11];
    this.note.id = this.topic.notesList[noteId - 11].id;
    this.note.title = this.topic.notesList[noteId - 11].title;
    this.note.text = this.topic.notesList[noteId - 11].text;
    // console.log(this.note.id);
  }
  
  
}
