import { InMemoryDbService } from 'angular-in-memory-web-api';
import {Topic} from './topic';
import {Note} from './note';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const topics = [
      { id: 11, 
        name: 'To Dos', 
        notesList: [
          { id: 11, title: 'To Do 21.01.19', text: 'This is example Text 1' },
          { id: 12, title: 'To Do 20.01.19', text: 'This is example Text 2' },
          { id: 13, title: 'To Do 19.01.19', text: 'This is example Text 3' },
          { id: 14, title: 'To Do 18.01.19', text: 'This is example Text 4' },
          { id: 15, title: 'To Do 17.01.19', text: 'This is example Text 5' },
          { id: 16, title: 'To Do 16.01.19', text: 'This is example Text 6' },
          { id: 17, title: 'To Do 15.01.19', text: 'This is example Text 7' },
          { id: 18, title: 'To Do 14.01.19', text: 'This is example Text 8' },
          { id: 19, title: 'To Do 13.01.19', text: 'This is example Text 9' },
          { id: 20, title: 'To Do 12.01.19', text: 'This is example Text 0' }
        ] 
    
      },



      { id: 12, 
        name: 'Ideas',
        notesList:[
          { id: 11, title: 'Topic 2, note 1', text: 'This is an example Text for Topic 2...' },
          { id: 12, title: 'Topic 2, note 2', text: 'This is an example Text for Topic 2...' },
          { id: 13, title: 'Topic 2, note 3', text: 'This is an example Text for Topic 2...' },
          { id: 14, title: 'Topic 2, note 4', text: 'This is an example Text for Topic 2...' },
          { id: 15, title: 'Topic 2, note 5', text: 'This is an example Text for Topic 2...' },
          { id: 16, title: 'Topic 2, note 6', text: 'This is an example Text for Topic 2...' },
          { id: 17, title: 'Topic 2, note 7', text: 'This is an example Text for Topic 2...' }
        ]
      },



      { id: 13, 
        name: 'Present ideas',
        notesList:[
          { id: 11, title: 'Topic 3, note 1', text: 'Some note of topic three' },
          { id: 12, title: 'Topic 3, note 2', text: 'Some note of topic three' },
          { id: 13, title: 'Topic 3, note 3', text: 'Some note of topic three' },
          
        ]
      },
      
    ]; //ends array of topics

    /*
    const notesListTopic1 = [
      { id: 11, title: 'To Do 21.01.19', text: 'This is an example Text...' },
      { id: 12, title: 'To Do 20.01.19', text: 'This is an example Text...' },
      { id: 13, title: 'To Do 19.01.19', text: 'This is an example Text...' },
      { id: 14, title: 'To Do 18.01.19', text: 'This is an example Text...' },
      { id: 15, title: 'To Do 17.01.19', text: 'This is an example Text...' },
      { id: 16, title: 'To Do 16.01.19', text: 'This is an example Text...' },
      { id: 17, title: 'To Do 15.01.19', text: 'This is an example Text...' },
      { id: 18, title: 'To Do 14.01.19', text: 'This is an example Text...' },
      { id: 19, title: 'To Do 13.01.19', text: 'This is an example Text...' },
      { id: 20, title: 'To Do 12.01.19', text: 'This is an example Text...' }
    ];


    const notesListTopic2 = [
      { id: 11, title: 'Topic 2, note 1', text: 'This is an example Text for Topic 2...' },
      { id: 12, title: 'Topic 2, note 2', text: 'This is an example Text for Topic 2...' },
      { id: 13, title: 'Topic 2, note 3', text: 'This is an example Text for Topic 2...' },
      { id: 14, title: 'Topic 2, note 4', text: 'This is an example Text for Topic 2...' },
      { id: 15, title: 'Topic 2, note 5', text: 'This is an example Text for Topic 2...' },
      { id: 16, title: 'Topic 2, note 6', text: 'This is an example Text for Topic 2...' },
      { id: 17, title: 'Topic 2, note 7', text: 'This is an example Text for Topic 2...' },
    ];
    */
    return {topics};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.

  genId(topics: Topic[]): number {
    return topics.length > 0 ? Math.max(...topics.map(topic => topic.id)) + 1 : 11;
  }

  /*
  genId<T extends Hero | Crises | SuperHero>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }
  */
}