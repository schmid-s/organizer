import { Note } from './note';

export class Topic {
    id?: number;
    title: string;

    constructor(title : string, id?:number){
      this.title = title;
      if (id) this.id = id;
    }
    /*
    constructor(title: string, topicId: number, text: string, id?:number){
      this.title = title;
      this.text = text;
      if (id) this.id = id;
    }
    */
}


  