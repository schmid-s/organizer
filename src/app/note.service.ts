import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of, from } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { Topic } from './topic';
import { Note } from './note';
import { ActivatedRoute, Router, ActivationEnd } from '@angular/router';
import { NoteDbService } from './note-db.service';
import Dexie from 'dexie';
import 'dexie-observable';


@Injectable({
  providedIn: 'root',
})
export class NoteService {

  private notesTable: Dexie.Table<Note, number>;
  private topicsTable: Dexie.Table<Topic, number>;
  private $noteId: Observable<number>;
  private $topicId: Observable<number>;
  private updatedNotes : Subject<Note[]> = new Subject<Note[]>();
  public notes : Observable<Note[]>;
  private currentTopicId : number;

  // private noteListUrl = 'api/noteList${topic.id}'

  constructor(
    private http: HttpClient, 
    private noteDBService: NoteDbService, 
    private route: ActivatedRoute,
    private router: Router)
    {
    this.notesTable = this.noteDBService.table('notes');
    this.topicsTable = this.noteDBService.table('topics');
  }

  getInitialNotes(topicId: number) : Promise<Note[]>{
    return this.notesTable.where("topicId").equals(topicId).toArray();
  }

  getAllNotes(topicId: number) : Subject<Note[]>{

    //TO DO: Hier statt observables lieber promises hernehmen, weil nur immer ein Wert zurückgegeben wird!?

    //erstmal auf bisherige daten subscriben:
    let subscription = from(this.notesTable.where("topicId").equals(topicId).toArray()).subscribe(data => {
      this.updatedNotes.next(data);
      console.log('changes triggered');
    })
    //falls changes passieren erste subscription beenden und neu subscriben:
    this.noteDBService.on('changes', (changes) => {
      console.log('changes triggered');
      subscription.unsubscribe();
      subscription = from(this.notesTable.where("topicId").equals(topicId).toArray()).subscribe(data => {
        this.updatedNotes.next(data);
        console.log('changes triggered');
      })
    });


    console.log('noteservice performing getAllNotes on topicId: '+topicId);
    
    return this.updatedNotes;
  }

  getNote(noteId: number) : Observable<Note>{
    console.log('noteservice performing getNote on noteId: '+noteId);
    return from(this.notesTable.get(noteId));
  }

  getAllTopics() : Observable<Topic[]>{
    return from(this.topicsTable.toArray());
  }

  addNote(data) {
    return this.notesTable.add(data);
  }

  addTopic(data) {
    console.log('addTopic triggered');
    const newTopic: Topic  = new Topic(data);
    return this.topicsTable.add(newTopic);
  }

  updateNote(id, data) {
    if(data.title === '') data.title = 'Unlabeled Note';
    return this.notesTable.update(id, data);
  }

  removeNote(id) {
    return this.notesTable.delete(id);
  }

  async removeTopic(id) {
    await this.deleteNotesByTopicId(id);
    return this.topicsTable.delete(id);
  }

  async deleteNotesByTopicId(topicId): Promise<number>{
    return await this.notesTable
        .where("topicId").equals(topicId)
        .delete();
  }

  subscribeToCurrentNoteId(): void{
    this.route.paramMap.subscribe(params => {
      this.$noteId = of(+params.get('noteId')),
      error => {
        console.log('possibly no noteId available');
      }
    });
  }

  getCurrentNote(): Observable<Note> {
    let note: Observable<Note>;
    this.$noteId.subscribe(id => {note = from(this.notesTable.get(id))});
    return note;
  }

  getCurrentTopic(topicId : number): Observable<Topic> {
    //let topic: Observable<Topic>;
    //this.$topicId.subscribe(id => {topic = from(this.topicsTable.get(id))});
    //return topic;
    console.log('getCurrentTopic triggered');

    return this.$topicId.pipe(
      switchMap( id => {
        console.log('switchmap output id is'+(id));
        return from(this.topicsTable.get(id));
      })
    );
  }


////////////////////////////////////////////in progress:


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  
  private log(message: string) {
    console.log(`noteService: ${message}`);
  }
  
}
