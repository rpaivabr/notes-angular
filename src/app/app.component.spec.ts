import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { categories, category, note, notes } from './models';
import { DialogCategoryComponent } from './components/dialog-category/dialog-category.component';
import { By } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DialogNoteComponent } from './components/dialog-note/dialog-note.component';
import { NoteComponent } from './components/note/note.component';
import { CategoryComponent } from './components/category/category.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DialogCategoryComponent,
        DialogNoteComponent,
        NoteComponent,
        CategoryComponent,
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    component.isCategoryDialogOpen = true;
    fixture.detectChanges();

    const reqGetCategories = httpTestingController.expectOne({
      method: 'GET',
      url: `${environment.apiUrl}/categories`
    });
    const reqGetNotes = httpTestingController.expectOne({
      method: 'GET',
      url: `${environment.apiUrl}/notes`
    });
    reqGetCategories.flush(categories);
    reqGetNotes.flush(notes);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should get noteColor hex from categoryId', () => {
    expect(component.noteColor(notes[0].categoryId)).toBe(categories[0].color);
  });

  it('should get noteColor empty if category not exists', () => {
    expect(component.noteColor(5)).toBe('');
  });

  it('should set isCategoryDialog true when click addNew', () => {
    const template = fixture.nativeElement as HTMLElement;
    const addNewCategoryButton = template.querySelectorAll(
      '.btn'
    )[0] as HTMLButtonElement;

    addNewCategoryButton.click();

    expect(component.categoryToUpdate).toBeUndefined();
    expect(component.isCategoryDialogOpen).toBeTrue();
  });

  it('should set isCategoryDialogOpen false when close dialog', () => {
    const dialogCategoryComponent = fixture.debugElement.query(
      By.directive(DialogCategoryComponent)
    );

    dialogCategoryComponent.triggerEventHandler('close', null);

    expect(component.isCategoryDialogOpen).toBeFalse();
  });


  it('should set isCategoryDialogOpen false when close dialog and save (new) category', () => {
    const { id, ...newCategory } = category;
    const dialogCategoryComponent = fixture.debugElement.query(
      By.directive(DialogCategoryComponent)
    );

    dialogCategoryComponent.triggerEventHandler('close', newCategory);

    expect(component.isCategoryDialogOpen).toBeFalse();

    const reqPostCategories = httpTestingController.expectOne({
      method: 'POST',
      url: `${environment.apiUrl}/categories`
    });
    reqPostCategories.flush(category);
  });

  it('should set isCategoryDialogOpen false when close dialog and save (update) category', () => {
    const dialogCategoryComponent = fixture.debugElement.query(
      By.directive(DialogCategoryComponent)
    );

    dialogCategoryComponent.triggerEventHandler('close', category);

    expect(component.isCategoryDialogOpen).toBeFalse();

    const reqPutCategories = httpTestingController.expectOne({
      method: 'PUT',
      url: `${environment.apiUrl}/categories/${category.id}`
    });
    reqPutCategories.flush(category);
  });

  it('should set isNoteDialog true when click addNew', () => {
    const template = fixture.nativeElement as HTMLElement;
    const addNewNoteButton = template.querySelectorAll(
      '.btn'
    )[1] as HTMLButtonElement;

    addNewNoteButton.click();

    expect(component.noteToUpdate).toBeUndefined();
    expect(component.isNoteDialogOpen).toBeTrue();
  });

  it('should set isNoteDialogOpen false when close dialog', () => {
    const dialogNoteComponent = fixture.debugElement.query(
      By.directive(DialogNoteComponent)
    );

    dialogNoteComponent.triggerEventHandler('close', null);

    expect(component.isNoteDialogOpen).toBeFalse();
  });

  it('should set isNoteDialogOpen false when close dialog and save (update) note', () => {
    const dialogNoteComponent = fixture.debugElement.query(
      By.directive(DialogNoteComponent)
    );

    dialogNoteComponent.triggerEventHandler('close', note);

    expect(component.isNoteDialogOpen).toBeFalse();

    const reqPutNotes = httpTestingController.expectOne({
      method: 'PUT',
      url: `${environment.apiUrl}/notes/${note.id}`
    });
    reqPutNotes.flush(note);
  });

  it('should set isNoteDialogOpen false when close dialog and save (new) note', () => {
    const { id, ...newNote} = note
    const dialogNoteComponent = fixture.debugElement.query(
      By.directive(DialogNoteComponent)
    );

    dialogNoteComponent.triggerEventHandler('close', newNote);

    expect(component.isNoteDialogOpen).toBeFalse();

    const reqPostNotes = httpTestingController.expectOne({
      method: 'POST',
      url: `${environment.apiUrl}/notes`
    });
    reqPostNotes.flush(note);
  });

  it('should set isNoteDialogOpen false when close dialog and delete note', () => {
    const { id } = note
    const dialogNoteComponent = fixture.debugElement.query(
      By.directive(DialogNoteComponent)
    );

    dialogNoteComponent.triggerEventHandler('close', id);

    expect(component.isNoteDialogOpen).toBeFalse();

    const reqPostNotes = httpTestingController.expectOne({
      method: 'DELETE',
      url: `${environment.apiUrl}/notes/${id}`
    });
    reqPostNotes.flush(null);
  });
});
