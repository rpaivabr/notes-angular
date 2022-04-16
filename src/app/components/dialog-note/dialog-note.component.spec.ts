import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { categories, note } from '../../models';

import { DialogNoteComponent } from './dialog-note.component';

describe('DialogNoteComponent', () => {
  let component: DialogNoteComponent;
  let fixture: ComponentFixture<DialogNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogNoteComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNoteComponent);
    component = fixture.componentInstance;
    component.open = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patchValue if open with a existent note values', () => {
    component.note = note;
    component.ngOnInit();

    expect(component.noteForm.value.title).toBe(note.title);
    expect(component.noteForm.value.content).toBe(note.content);
    expect(component.noteForm.value.categoryId).toBe(note.categoryId);
  });

  it('should emit close null when click on "x" icon - cancel', () => {
    const closeEmitSpy = spyOn(component.close, 'emit');
    const template = fixture.nativeElement as HTMLElement;
    const closeIcon = template.querySelector(
      '.btn--close'
    )! as HTMLButtonElement;

    closeIcon.click();

    expect(closeEmitSpy).toHaveBeenCalledWith();
  });

  it('should emit close new note object when click on confirm button - submit', () => {
    component.categories = categories;
    component.note = note;
    component.ngOnInit();
    fixture.detectChanges();

    const closeEmitSpy = spyOn(component.close, 'emit');
    const template = fixture.nativeElement as HTMLElement;
    const confirmButton = template.querySelector(
      '.btn--success'
    )! as HTMLButtonElement;

    confirmButton.click();

    expect(component.noteForm.value).toEqual(note);
    expect(closeEmitSpy).toHaveBeenCalledWith(note);
  });

  it('should emit close with id number when click on delete button - remove', () => {
    component.categories = categories;
    component.note = note;
    component.ngOnInit();
    fixture.detectChanges();

    const closeEmitSpy = spyOn(component.close, 'emit');
    const template = fixture.nativeElement as HTMLElement;
    const deleteButton = template.querySelector(
      '.btn--danger'
    )! as HTMLButtonElement;

    deleteButton.click();

    expect(closeEmitSpy).toHaveBeenCalledWith(note.id);
  });
});
