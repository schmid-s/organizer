import { Injectable } from '@angular/core';


/*
Was brauche ich?
- Observable des (aktuellen!) Topic von notes-list
- Wenn ich die notes List bei Veränderung der Note aktualisieren will,
  brauche ich auch ein Observable der aktuellen note
*/

@Injectable({
  providedIn: 'root'
})
export class MasterDetailService {

  constructor() { }
}
