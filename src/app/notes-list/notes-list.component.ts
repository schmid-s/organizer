import { Component, OnInit, Input, OnChanges, SimpleChanges, HostBinding, ElementRef } from '@angular/core';
// import { Note } from '../note'

import {ActivatedRoute} from '@angular/router';

import { Location} from '@angular/common';
import { Topic } from '../topic';
import { Note } from '../note';
import { NoteService } from '../note.service';
import { switchMap } from 'rxjs/operators';
import { IndexeddbService } from '../indexeddb.service';

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
    private indexeddbService: IndexeddbService
    ) { }


  ngOnInit() {
    console.log('list-component topic id is now: ' + this.topicId);
    this.subscribeToTopic();
    console.log('list-component topic id is now: ' + this.topicId);
    // this.notesList = this.extractNotesList();
    this.indexeddbService.createDB();
    this.indexeddbService.addNote();

    
  }

  ngAfterViewInit(){
    this.setResponsiveLayoutimits();
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

  setResponsiveLayoutimits(){
    this.setMaxHeightFromElementTopToWindowBottom(this.componentElement);
  }

  setMaxHeightFromElementTopToWindowBottom(element : ElementRef){
    //set maxheight von NotesListComponent aus parent element
    //const parentElem = this.element.nativeElement.parentNode;
    const elemDistanceToTop = this.getDistanceToTop(this.componentElement);
    const maxHeight = window.innerHeight - elemDistanceToTop;
    element.nativeElement.setAttribute("maxHeight()", maxHeight);
    console.log('elem Distance to top: '+ elemDistanceToTop);
    console.log('window height(window.innerHeight): '+ window.innerHeight);
    console.log('-> maxHeight set to: '+ maxHeight);
    //strategy: take height of parent - two times distance to parent-top, assuming there is a top button and a 
    //let upperLimit = document.getElementById('notesList-ul').offsetTop;
  }
  
  getDistanceToTop(element){
      var yPosition = 0;
      while(element) {
          yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
          element = element.offsetParent;
      }
      return yPosition;
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
