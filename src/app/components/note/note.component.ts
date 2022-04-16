import { Component, Input } from '@angular/core';

import { Note } from '../../models';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {

  @Input() note!: Note;
  @Input() color!: string;

}
