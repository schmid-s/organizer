import { Component, OnInit, Input, OnChanges, SimpleChanges, HostBinding, ElementRef } from '@angular/core';
// import { Note } from '../note'

import {ActivatedRoute} from '@angular/router';
import {Observable, of} from 'rxjs';
import { Location} from '@angular/common';
import { Topic } from '../topic';
import { Note } from '../note';
import { NoteService } from '../note.service';
import { switchMap, flatMap, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit, OnChanges {

  private componentElement: ElementRef;
  topic: Topic;
  @Input()
  topicId: number;

  notes: Note[];
  selectedNote: Note;

  viewAsGrid: boolean = false;
  //gridViewBtnText: string = "Grid View";
  gridViewBtnText: string = "▦";
  listViewBtnText: string = "▤";
  currentViewModeBtnText = this.gridViewBtnText;

  @HostBinding('class.hidden-state-host') componentHidden: boolean = false;
  visibleStateBtnText: string = "Hide";
  hiddenStateBtnText: string = '☰';
  currentHideStateBtnText = this.visibleStateBtnText;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private location: Location,
    ) { }


  ngOnInit() {
    // this.notesList = this.extractNotesList();
    this.getNotesOnNewTopic();
    //this.subscribeToNotes();
  }

  
  /*
  subscribeToRouteId() : void{
    let noteId: number;
    this.route.paramMap.subscribe((params) => {
      console.log('topic id is now: ' + this.getTopic());
      $noteId = +params.get('id1');
      console.log('note id is now: ' + noteId);
    });
  }
  */
  changeListLayout(){
    this.viewAsGrid = !this.viewAsGrid;
    if(this.viewAsGrid){
      this.currentViewModeBtnText = this.listViewBtnText;
    } else{
      this.currentViewModeBtnText = this.gridViewBtnText;
    }
  }

  changeHideState(){
    this.componentHidden = !this.componentHidden;
    if(!this.componentHidden){
      this.currentHideStateBtnText = this.visibleStateBtnText;
    } else{
      this.currentHideStateBtnText = this.hiddenStateBtnText;
    }
  }


  /*
  getTopic(){
    this.noteService.getCurrentTopic().subscribe( (topic) => this.topic = topic);
  }
  */
 /*
  subscribeToCurrentTopicId(): void {
    console.log('subscribeToCurrentTopicId() doing');
    this.route.paramMap.subscribe(params => {
      this.topicId = +params.get('topicId');
      //this.subscribeToTopic(this.getTopic(), this.topicId);
      console.log('this topic id is '+(params.get('topicId'))),
      console.log('params has notes-manager '+(params.has('notes-manager'))),
      console.log('parameter names in the map: '+(params.keys)),
      error => {
        console.log('possibly no noteId available');
      }
    });
  }
  */
  getNotesOnNewTopic(){
    this.route.paramMap.pipe(
      tap(() => console.log("tapping")),
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.topicId = +params.get('topicId');
        console.log('this.topicId = '+this.topicId);
        return this.noteService.getAllNotes(this.topicId);
      })
    ).subscribe( (notes) => {
        this.notes = notes
        console.log('this.notes = '+this.notes);
    })
    ;
  }
  

  subscribeToNotes(){
    this.noteService.getAllNotes(this.topic.id).subscribe( (notes) => {
      this.notes = notes;
      console.log('notes updated in notes-list component');
    }
    );
  }

  /*
  getTopicId(): void {
    this.route.paramMap.subscribe(params => {
      this.topicId = +params.get('topicId');
      console.log('list-component topic id is now: ' + this.topicId);
      this.subscribeToTopic();
      //besser switchMap!? o.Ä.? -> separate Funktion!
    });
  }
  */

  /*was wird gebraucht?:

  TopicId wird vom parent über input übergeben:
  */


  // das der TopicId entsprechende Topic wird aus der Datenbank bezogen

  //
  // Wenn topic sich ändert, soll entsprechend subscribet werden

  /*
  subscribeToTopic(): void {
    this.noteService.getCurrentTopic(this.topicId).subscribe(topic => {
      this.topic = topic;
      this.notesList = this.topic.notesList;
      console.log('list-component topic id is now: ' + this.topicId);
    });
  }
  */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['topicId']) {
      //this.subscribeToTopic();
    }
  }

  onSelect(note: Note): void {
    this.selectedNote = note;
  }

  createNote() : void {

  }

  

}
