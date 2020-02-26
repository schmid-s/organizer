export class Note {
  id: number;
  topicId: number;
  title: string;
  text: string;
  
  constructor(title?: string, topicId?: number, text?: string, id?:number){
    this.title = title;
    this.text = text;
    if (id) this.id = id;
  }
  
}

