import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { category } from '../../models';

import { DialogCategoryComponent } from './dialog-category.component';

describe('DialogCategoryComponent', () => {
  let component: DialogCategoryComponent;
  let fixture: ComponentFixture<DialogCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCategoryComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCategoryComponent);
    component = fixture.componentInstance;
    component.open = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patchValue if open with a existent category values', () => {
    component.category = category;
    component.ngOnInit();

    expect(component.categoryForm.value.name).toBe(category.name);
    expect(component.categoryForm.value.color).toBe(category.color);
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

  it('should emit close new category object when click on confirm button - submit', () => {
    component.category = category;
    component.ngOnInit();
    fixture.detectChanges();

    const closeEmitSpy = spyOn(component.close, 'emit');
    const template = fixture.nativeElement as HTMLElement;
    const confirmButton = template.querySelector(
      '.btn--success'
    )! as HTMLButtonElement;

    confirmButton.click();

    expect(component.categoryForm.value).toEqual(category);
    expect(closeEmitSpy).toHaveBeenCalledWith(category);
  });
});
