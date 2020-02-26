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
  topicFormOpen: boolean = false;
  topicTextEmpty: boolean = true;
  newTopicName: string = "";

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.getTopicList();
  }

  getTopicList(): void {
    this.noteService.getAllTopics().subscribe(topics => this.topicsArray = topics); 
  }

  openNewTopicForm(): void {
    this.topicFormOpen = true;
  }

  createNewTopic(): void {
    this.noteService.addTopic(this.newTopicName).then((id) => console.log("topic with this id was added: "+id));
    this.getTopicList();
  }

  closeNewTopicForm(){
    this.topicFormOpen = false;
  }

  
  isTopicTextEmpty() : void{
    if (this.newTopicName == '') {
      this.topicTextEmpty = true;
    } else {
      this.topicTextEmpty = false;
    }
  }
  


}
