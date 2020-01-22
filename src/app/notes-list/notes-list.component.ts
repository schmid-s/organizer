import { Component, OnInit, Input, OnChanges, SimpleChanges, HostBinding, ElementRef } from '@angular/core';
// import { Note } from '../note'

import {ActivatedRoute} from '@angular/router';

import { Location} from '@angular/common';
import { Topic } from '../topic';
import { Note } from '../note';
import { NoteService } from '../note.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit, OnChanges {

  private componentElement: ElementRef;
  topic: Topic;
  @Input() topicId: string;

  notesList: Note[];
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
    console.log('list-component topic id is now: ' + this.topicId);
    this.subscribeToTopic();
    console.log('list-component topic id is now: ' + this.topicId);
    // this.notesList = this.extractNotesList();
  }


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

  subscribeToTopic(): void {
    this.noteService.getTopic(this.topicId).subscribe(topic => {
      this.topic = topic;
      this.notesList = this.topic.notesList;
      console.log('list-component topic id is now: ' + this.topicId);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['topicId']) {
      this.subscribeToTopic();
    }
  }

  onSelect(note: Note): void {
    this.selectedNote = note;
  }

  createNote() : void {

  }

  

}
