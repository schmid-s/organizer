import { Component, OnInit } from '@angular/core';
import { Topic } from '../topic';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-notes-nav',
  templateUrl: './notes-nav.component.html',
  styleUrls: ['./notes-nav.component.scss']
})
export class NotesNavComponent implements OnInit {

  topicsArray: Topic[];

  constructor(private noteService: NoteService) { }

  getTopicList(): void {
    this.noteService.getTopics().subscribe(topics => this.topicsArray = topics); 
  }

  ngOnInit() {
    this.getTopicList();
  }

}
