import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from} from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { Topic } from './topic';
import {Note} from './note';
import { ActivatedRoute, Router, ActivationEnd } from '@angular/router';
import { NoteDbService } from './note-db.service';
import Dexie from 'dexie';
import 'dexie-observable';


@Injectable({
  providedIn: 'root',
})
export class NoteService {

  private topicsUrl = 'api/topics';
  private notesTable: Dexie.Table<Note, number>;
  private topicsTable: Dexie.Table<Topic, number>;
  private $noteId: Observable<number>;
  private $topicId: Observable<number>;
  private params;

  // private noteListUrl = 'api/noteList${topic.id}'

  constructor(
    private http: HttpClient, 
    private noteDBService: NoteDbService, 
    private route: ActivatedRoute,
    private router: Router) 
    {
    this.notesTable = this.noteDBService.table('notes');
    this.topicsTable = this.noteDBService.table('topics');

    this.noteDBService.on('changes', function (changes) {
      changes.forEach(function (change : any) {
        switch (change.type) {
          case 1: // CREATED
            console.log('An object was created: ' + JSON.stringify(change.obj));

            break;
          case 2: // UPDATED
            console.log('An object with key ' + change.key + ' was updated with modifications: ' + JSON.stringify(change.mods));
            break;
          case 3: // DELETED
            console.log('An object was deleted: ' + JSON.stringify(change.oldObj));
            break;
        }
      });
    });
  }

  getAllNotes(topicId: number) : Observable<Note[]>{
    console.log('noteservice performing getAllNotes on topicId: '+topicId);
    return from(this.notesTable.where("topicId").equals(topicId).toArray());
  }

  getAllNotes(topicId: number) : Observable<Note[]>{
    console.log('noteservice performing getAllNotes on topicId: '+topicId);
    return from(this.notesTable.where("topicId").equals(topicId).toArray());
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
    const newTopic: Topic  = new Topic(data);
    return this.topicsTable.add( newTopic);
  }

  updateNote(id, data) {
    return this.notesTable.update(id, data);
  }

  removeNote(id) {
    return this.notesTable.delete(id);
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
    return this.$topicId.pipe(
      switchMap( id => {
        console.log('switchmap output id is'+(id));
        return from(this.topicsTable.get(id));
      })
    );
  }




////////////////////////////////////////////in progress:

  /*
  getNote(topicId: number): Observable <Topic>{
    const url = `${this.topicsUrl}/${topicId}`;
    //const url = `./noteslist.${this.noteId}`;
    return this.http.get<Topic>(url).pipe(
      tap(_ => console.log(`fetched note id=${topicId}`)),
      catchError(this.handleError<Topic>(`getTopic id=${id}`))
    );
  }
  */
  getParentTopic(route : ActivatedRoute){
    
  }


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
