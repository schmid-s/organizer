import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { Location} from '@angular/common';
import { Topic } from '../topic';
import {Note} from '../note';
import { NoteService} from '../note.service';

@Component({
  selector: 'app-notes-level',
  templateUrl: './notes-level.component.html',
  styleUrls: ['./notes-level.component.scss']
})
export class NotesLevelComponent implements OnInit {

  // topic: Topic;

  // topic$: Observable <Topic>; ist käse - Niemand subscribet
  //@Input() topic: Topic;
  @Input() topicId: number;
  // notesList$: Observable <Note[]>; ist käse - Niemand subscribe

  notesList: Note[];
  selectedNote: Note;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private location: Location
    ) { }
  
  getTopicId(): void {
    this.route.paramMap.subscribe((params) => {
      this.topicId = +params.get('topicId');
      console.log('note-level topic id is now: ' + this.topicId);
    });
  }

  ngOnInit() {
    this.getTopicId();
  }

// das Topic des NotesList.Component wird darüber bestimmt,
  // auf welchen Topic-Namen in der Url navigiert wurde:

/*
  getTopic() : void{
    const id = +this.route.snapshot.paramMap.get('id');
    // ! The JavaScript + operator converts the string to a number, which is what a hero id should be
    this.noteService.getTopic(id).subscribe(topic => this.onNewTopic(topic));
  }

  onNewTopic(topic){
    this.topic$ = topic;
    this.notesList$ = topic.notesList;
    console.log(this.notesList$);
  }
*/


    // this.notesList = this.extractNotesList();

    
/*

  // gets the current id in the url in order to subscibeToTopic
  // and ultimately get the current topic and noteslist
  subscribeToRouteId(): void {
    // const id = +this.route.paramMap.get('id');
    //let id: number;
    this.route.paramMap.subscribe((params) => {
      this.topic = +params.get('topicId');
      console.log('list-component topic id is now: ' + id);
      console.log(params);
      this.subscribeToTopic(id);
    });
  }

  subscribeToTopic(id: number): void {
    // console.log('subscribeToTopic id is now: ' +this.id);
    // ! The JavaScript + operator converts the string to a number, which is what a hero id should be
    this.noteService.getTopic(id).subscribe(topic => {
      this.onNewTopic(topic);
      // console.log('topic is now: ' + topic.id);
    });
  }




  onNewTopic(topic){
    this.topic = topic;
    this.notesList = topic.notesList;
    // console.log(this.notesList);
  }

  onSelect(note: Note): void {
    this.selectedNote = note;
  }

*/

  /*
  getTopic() : void{
    const name : string = this.route.snapshot.paramMap.get('name');
    // ! The JavaScript + operator converts the string to a number, which is what a hero id should be
    this.noteService.getTopic(name).subscribe(topic => onNewTopic(topic))
  }
  */


  /*
  extractNotesList(): Note[]{
    return this.topic$.notesList;
  }
*/

  // Jedes Topic hat eine notesList, die von dem NotesList.Component angezeigt werden soll
  // Diese muss über das Topic irgendwie einzuholen sein:

  // - soll auf das ngOnInit irgendweiner Klasse den Topics eine notesList zugewiesen werden?
  // -> eine vorgegebene wäre gut, sodass nicht anfangs mit http irgendetwas basierend auf namen 
  // von Topics kompliziert automatisch generiert werde muss

  // ein weiteres Observable sollte nich notwendig sein, da ja die Topics schon Observables sind, 
  // welche ihre notesList schon enthalten sollten.
  

}
