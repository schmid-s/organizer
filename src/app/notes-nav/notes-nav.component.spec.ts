import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesNavComponent } from './notes-nav.component';

describe('NotesNavComponent', () => {
  let component: NotesNavComponent;
  let fixture: ComponentFixture<NotesNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
