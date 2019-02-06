import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import {ActivatedRoute, Router} from '@angular/router';

import { Location} from '@angular/common';
import { NoteService} from '../note.service';
import { Topic } from '../topic';

@Component({
  selector: 'app-note-viewer',
  templateUrl: './note-viewer.component.html',
  styleUrls: ['./note-viewer.component.css']
})
export class NoteViewerComponent implements OnInit {

  note: Note;

  //parentId: number;

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



  getTopic() : number {
    let topicId: number;
    this.route.paramMap.subscribe((params) => {
      
      topicId = +params.get('id');
      console.log('parent: ' + topicId );
      
    });
    return topicId;
  }



//muss ich hier wirklich subscriben oder reicht denn nicht
//eine reine zuweisung des werts der parent id um die note zu holen?
//die anzeige der richtigen notelist managet ja die noteslist,
//die die url bestimmt...wenn diese sich ändert weiß das aber
// der notes-viewr trotzdem nicht-> ausprobieren:

//////////////////////////////////////////////////// in progress:

/*
  getTopic() : number {
    let topicId: number;
    topicId = 
      console.log('parent: ' + topicId );
      
    });
    return topicId;
  }
*/

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

  //gets the current id in the url in order to subscibeToTopic
  // and ultimately get the current topic and noteslist


  subscribeToRouteId() : void{
    //const id = +this.route.paramMap.get('id');
    let topicId: number;
    //console.log(this.route.paramMap.toString);


//mit paramMap funktioniert nicht mehr mit secondary route

    
    this.route.paramMap.subscribe(params => {
      topicId = +params.get('topicId');
      console.log('topic: ' + topicId );
      console.log('note gleich anfangs: ' +params.get('noteId') );
      console.log(this.route);
      console.log(params );
      this.subscribeToTopic(topicId);
    });
    

    // snapshot-versuch:
    /*
    topicId = this.route.snapshot.params.topicId;
    console.log('topic mit snapshot: ' + topicId );
    this.subscribeToTopic(topicId);
    */
  }
  
  
  subscribeToTopic(id: number) : void{
    //console.log('subscribeToTopic id is now: ' +this.id);
    // ! The JavaScript + operator converts the string to a number, which is what a hero id should be
    
    let noteId: number;
    
    this.route.paramMap.subscribe(params => {
      noteId = +params.get('noteId');
      console.log('note: ' + noteId );
    });

    this.noteService.getTopic(id).subscribe(topic => {
      this.onNewTopic(topic, noteId);
      console.log('topic is now: ' + topic.name);
    });

    

  }

  onNewTopic(topic: Topic, noteId : number){
    this.note = topic.notesList[noteId - 10];
    this.note.id = topic.notesList[noteId - 10].id;
    this.note.title = topic.notesList[noteId - 10].title;
    this.note.text = topic.notesList[noteId - 10].text;
    //console.log(this.note.id);
  }

  getNote() : void{

  }

  ngOnInit() {
    this.subscribeToRouteId();
  }

}
