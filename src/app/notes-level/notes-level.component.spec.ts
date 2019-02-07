import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesLevelComponent } from './notes-level.component';

describe('NotesLevelComponent', () => {
  let component: NotesLevelComponent;
  let fixture: ComponentFixture<NotesLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
