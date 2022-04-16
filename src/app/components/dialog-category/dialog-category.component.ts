import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Category } from '../../models';

@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.css'],
})
export class DialogCategoryComponent implements OnInit {
  @Input() open: boolean = false;
  @Input() category?: Category;
  @Output() close = new EventEmitter<Category>();
  categoryForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initCategoryForm();
  }

  cancel(): void {
    this.close.emit();
  }

  submit(): void {
    this.close.emit(this.categoryForm.value as Category);
  }

  private initCategoryForm(): void {
    this.categoryForm = this.formBuilder.group({
      id: null,
      name: ['', Validators.required],
      color: ['#ffffff', Validators.required],
    });

    if (this.category) this.categoryForm.patchValue({ ...this.category });
  }
}
