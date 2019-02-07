import { Component, OnInit, Input, OnChanges } from '@angular/core';
// import { Note } from '../note'

import {ActivatedRoute} from '@angular/router';

import { Location} from '@angular/common';
import { Topic } from '../topic';
import {Note} from '../note';
import { NoteService} from '../note.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  // topic: Topic; 

  // topic$: Observable <Topic>; ist käse - Niemand subscribet
  topic: Topic;

  
  // notesList$: Observable <Note[]>; ist käse - Niemand subscribe

  notesList: Note[];
  selectedNote: Note;


  constructor(
    private route: ActivatedRoute, 
    private noteService: NoteService, 
    private location: Location
    ) { }




  // gets the current id in the url in order to subscibeToTopic
  // and ultimately get the current topic and noteslist
  subscribeToRouteId(): void{
    // const id = +this.route.paramMap.get('id');
    let id: number;
    this.route.paramMap.subscribe((params) => {
      id = +params.get('topicId');
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
      // console.log('topic is now: ' + topic.name);
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

  ngOnInit() {
    this.subscribeToRouteId();

    // this.notesList = this.extractNotesList();
  }

  /*
  ngOnChanges(changes: SimpleChanges){
    this.getTopic();
  }
  */
}
