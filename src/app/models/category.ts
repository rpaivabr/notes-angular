export interface Category {
  id?: number;
  name: string;
  color: string;
}

export const categories: Category[] = [
  {
    name: 'React',
    color: '#a1c8e9',
    id: 1,
  },
  {
    name: 'Angular',
    color: '#f6c2d9',
    id: 2,
  },
  {
    name: 'Vue',
    color: '#bcdfc9',
    id: 3,
  },
];

export const category: Category = categories[0];
