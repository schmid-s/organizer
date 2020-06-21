import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import {Topic} from '../app/topic';
import {Note} from '../app/note';

@Injectable({
  providedIn: 'root'
})
export class NoteDbService extends Dexie {

    topics: Dexie.Table<Topic, number>;
    notes: Dexie.Table<Note, number>;

    constructor() {  
      super("NotesDB");
      
      var db = this;

      //
      // Define tables and indexes
      //
      db.version(1).stores({
          topics: 'id++, title',
          notes: 'id++, topicId, title, text',
      });
      
      db.open();
      db.notes.add({id: 1, topicId: 1, title: "test note 1", text:"Testitest"});
      db.notes.add({id: 2, topicId: 1, title: "test note 2", text:"Testitest"});
      db.notes.add({id: 3, topicId: 1, title: "test note 3", text:"Testitest"});

      db.topics.add({id: 1, title: "Topic 1"});
      db.topics.add({id: 2, title: "Topic 2"});
      // db.topics.add({id: 2, title: "topic 2"});
      // db.topics.add({id: 3, title: "topic 3"});
      // db.topics.add({id: 4, title: "topic 4"});


      // The following lines are needed for it to work across typescipt using babel-preset-typescript:
      this.topics = this.table("topics");
      this.notes = this.table("notes");


      db.topics.mapToClass(Topic);
      db.notes.mapToClass(Note);


      
    }


}
