import { TestBed } from '@angular/core/testing';

import { NoteDbService } from './note-db.service';

describe('NoteDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoteDbService = TestBed.get(NoteDbService);
    expect(service).toBeTruthy();
  });
});
