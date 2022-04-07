import { Component, OnInit } from '@angular/core';

interface Note {
  id?: number;
  title: string;
  content: string;
  categoryId: number;
}

interface Category {
  id?: number;
  name: string;
  color: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  logo = 'My Notes';

  categories: Category[] = [
    {
      id: 1,
      name: 'React',
      color: '#87cefa',
    },
  ];
  notes: Note[] = [
    {
      id: 1,
      categoryId: 1,
      title: 'Title',
      content: 'Content',
    },
  ];

  isCategoryDialogOpen = false;
  isNoteDialogOpen = false;

  get hasOpenDialog(): boolean {
    return this.isCategoryDialogOpen || this.isNoteDialogOpen;
  }

  constructor() {}

  ngOnInit(): void {}

  openDialog(dialogName: 'note' | 'category'): void {
    if (dialogName === 'note') {
      this.isNoteDialogOpen = true;
    }
    if (dialogName === 'category') {
      this.isCategoryDialogOpen = true;
    }
  }

  closeDialog(dialogName: 'note' | 'category'): void {
    if (dialogName === 'note') {
      this.isNoteDialogOpen = false;
    }
    if (dialogName === 'category') {
      this.isCategoryDialogOpen = false;
    }
  }
}
