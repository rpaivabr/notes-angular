export interface Note {
  id?: number;
  title: string;
  content: string;
  categoryId: number;
}

export const notes: Note[] = [
  {
    title: 'Title',
    content: 'Content',
    categoryId: 1,
    id: 1,
  },
  {
    title: 'Title2',
    content: 'Content2',
    categoryId: 2,
    id: 2,
  },
];

export const note: Note = notes[0];
