import { async, ComponentFixture, TestBed, } from '@angular/core/testing';
import { NoteViewerComponent } from './note-viewer.component';
import { NotesNavComponent } from '../notes-nav/notes-nav.component';

fdescribe('NoteViewerComponent', () => {
  let component: NoteViewerComponent;
  let fixture: ComponentFixture<NoteViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should recognize if a notes's text-area is empty", () => {
    this.note.text = '';
    this.isNoteTextEmpty();
    expect(this.noteTitleEmpty).toBeTruthy;
  });
});
