import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogNoteComponent } from './components/dialog-note/dialog-note.component';
import { DialogCategoryComponent } from './components/dialog-category/dialog-category.component';
import { CategoryComponent } from './components/category/category.component';
import { NoteComponent } from './components/note/note.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogNoteComponent,
    DialogCategoryComponent,
    CategoryComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
