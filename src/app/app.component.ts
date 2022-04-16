import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { environment } from '../environments/environment';
import { Category, Note } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  logo = 'My Notes';
  categories: Category[] = [];
  notes: Note[] = [];
  noteForm!: FormGroup;

  isCategoryDialogOpen = false;
  isNoteDialogOpen = false;
  noteToUpdate?: Note;
  categoryToUpdate?: Category;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getCategories();
    this.getNotes();
  }

  ngOnDestroy(): void {
  }

  noteColor(categoryId: number): string {
    const category = this.categories.find(
      (cat) => cat.id === Number(categoryId)
    );
    return category ? category.color : '';
  }

  openNoteDialog(note?: Note): void {
    this.noteToUpdate = note;
    this.isNoteDialogOpen = true;
  }

  openCategoryDialog(category?: Category): void {
    this.categoryToUpdate = category;
    this.isCategoryDialogOpen = true;
  }

  closeNoteDialog(): void {
    this.isNoteDialogOpen = false;
  }

  closeCategoryDialog(): void {
    this.isCategoryDialogOpen = false;
  }

  updateNote(note?: Note | number): void {
    this.closeNoteDialog();
    if (!note) return;
    typeof note === 'number'
      ? this.deleteNote(note as number)
      : this.saveNote(note as Note);
  }

  updateCategory(category?: Category): void {
    this.closeCategoryDialog();
    if (!category) return;
    this.saveCategory(category as Category);
  }

  private saveNote(note: Note): void {
    !note.id ? this.postNote(note) : this.putNote(note);
  }

  private saveCategory(category: Category): void {
    !category.id ? this.postCategory(category) : this.putCategory(category);
  }

  /** API methods */

  private getCategories(): void {
    this.httpClient
      .get<Category[]>(`${environment.apiUrl}/categories`)
      .subscribe({
        next: (categories) => (this.categories = categories),
      });
  }

  private postCategory(category: Category): void {
    this.httpClient
      .post<Category>(`${environment.apiUrl}/categories`, category)
      .subscribe({
        next: (newCategory) =>
          (this.categories = [...this.categories, newCategory]),
      });
  }

  private putCategory(category: Category): void {
    this.httpClient
      .put<Category>(
        `${environment.apiUrl}/categories/${category.id}`,
        category
      )
      .subscribe({
        next: (updatedCategory) =>
          (this.categories = this.categories.map((category) =>
            category.id === updatedCategory.id ? updatedCategory : category
          )),
      });
  }

  private getNotes(): void {
    this.httpClient.get<Note[]>(`${environment.apiUrl}/notes`).subscribe({
      next: (notes) => (this.notes = notes),
    });
  }

  private postNote(note: Note): void {
    this.httpClient.post<Note>(`${environment.apiUrl}/notes`, note).subscribe({
      next: (newNote) => (this.notes = [...this.notes, newNote]),
    });
  }

  private putNote(note: Note): void {
    this.httpClient
      .put<Note>(`${environment.apiUrl}/notes/${note.id}`, note)
      .subscribe({
        next: (updatedNote) =>
          (this.notes = this.notes.map((note) =>
            note.id === updatedNote.id ? updatedNote : note
          )),
      });
  }

  private deleteNote(id: number): void {
    this.httpClient
      .delete<void>(`${environment.apiUrl}/notes/${id}`)
      .subscribe({
        next: () => (this.notes = this.notes.filter((note) => note.id !== id)),
      });
  }
}
