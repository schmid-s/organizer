import { Injectable } from '@angular/core';
//import { indexedDB } from 

@Injectable({
  providedIn: 'root'
})
export class IndexeddbService {
  db : IDBDatabase = null;
  btnCreateDB = document.getElementById("btnCreateDB");
  //btnAddNote = document.getElementById("btnAddNote");
  //btnViewNotes = document.getElementById("btnViewNote;s")

  constructor() { 
  }
  
  ngOnInit(){
    //this.btnCreateDB.addEventListener("click", this.createDB);
    //this.btnAddNote.addEventListener("click", this.addNote);
    //this.btnViewNotes.addEventListener("click", this.viewNotes);
    //this.createDB();
    //this.addNote();
  }
  /*
  viewNotes() {
      const tx = this.db.transaction("personal_notes","readonly");
      const pNotes = tx.objectStore("personal_notes");
      const request = pNotes.openCursor();
      request.onsuccess = e => {
          const cursor = e.target.result
          if (cursor) {
              alert(`Title: ${cursor.key} Text: ${cursor.value.text} `)
              //do something with the cursor
              cursor.continue()
          }
      }
  }
  */
  async addNote() {
      console.log(this.db);
      const note = {
          title: "note" + Math.random(),
          text: "This is my note"
      }
      const tx = this.db.transaction("personal_notes", "readwrite");
      //tx.onerror = e => alert( ` Error! ${e.target.error}  `);
      const pNotes = await tx.objectStore("personal_notes");
      pNotes.add(note);
  }
  createDB() {
      //const dbName = (<HTMLInputElement>document.getElementById("txtDB")).value;
      //const dbVersion = (<HTMLInputElement>document.getElementById("txtVersion")).value;
      const dbName = "db1";
      const dbVersion = 1;
      const request : IDBOpenDBRequest = indexedDB.open(dbName, dbVersion);
          //on upgrade needed
          request.onupgradeneeded = e => {
              this.db = (<IDBOpenDBRequest>e.target).result;
              /* note = {
                  title: "note1",
                  text: "this is a note"
              }*/
              const pNotes = this.db.createObjectStore("personal_notes", {keyPath: "title"});
              const todoNotes = this.db.createObjectStore("todo_notes", {keyPath: "title"});
              
              alert(`upgrade is called database name: ${this.db.name} version : ${this.db.version}`);
          }
          //on success 
          request.onsuccess = e => {
              this.db = (<IDBOpenDBRequest>e.target).result;
              //alert(`success is called database name: ${this.db.name} version : ${this.db.version}`);
              console.log("success");
          }
          //on error
          request.onerror = e => {
              alert(`error: ${(<IDBOpenDBRequest>e.target).error} was found `);
                
          }
  }
}
