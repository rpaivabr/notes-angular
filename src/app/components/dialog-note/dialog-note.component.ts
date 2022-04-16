import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Category, Note } from '../../models';

@Component({
  selector: 'app-dialog-note',
  templateUrl: './dialog-note.component.html',
  styleUrls: ['./dialog-note.component.css']
})
export class DialogNoteComponent implements OnInit {

  @Input() open: boolean = false;
  @Input() note?: Note;
  @Input() categories: Category[] = [];
  @Output() close = new EventEmitter<Note | number>();
  noteForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initNoteForm();
  }

  noteColor(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === Number(categoryId));
    return category ? category.color : '';
  }

  cancel(): void {
    this.close.emit();
  }

  submit(): void {
    this.close.emit(this.noteForm.value as Note);
  }

  remove(): void {
    this.close.emit(Number(this.noteForm.value.id));
  }

  private initNoteForm(): void {
    this.noteForm = this.formBuilder.group({
      id: null,
      title: ['', Validators.required],
      content: ['', Validators.required],
      categoryId: ['', Validators.required],
    })

    if (this.note) this.noteForm.patchValue({...this.note});
  }

}
