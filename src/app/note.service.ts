import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Topic } from './topic';
import {Note} from './note';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class NoteService {

  private topicsUrl = 'api/topics';

  // private noteListUrl = 'api/noteList${topic.id}'

  constructor(private http: HttpClient) { }


  // nimmt id und returnt das Topic Observable mit dieser id aus der Datenbank
  getTopic(id: number): Observable <Topic>{
    const url = `${this.topicsUrl}/${id}`;
    return this.http.get<Topic>(url).pipe(
      tap(_ => console.log(`fetched topic id=${id}`)),
      // catchError(this.handleError<Topic>(`getTopic id=${id}`))
    );
  }

  getTopics(): Observable <Topic[]>{
    return this.http.get<Topic[]>(this.topicsUrl);
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
