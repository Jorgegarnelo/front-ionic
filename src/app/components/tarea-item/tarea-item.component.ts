import { Component, OnInit, Input } from '@angular/core';
import { Tarea } from '../../shared/models/tarea.interface';

@Component({
  selector: 'app-tarea-item',
  templateUrl: './tarea-item.component.html',
  styleUrls: ['./tarea-item.component.scss'],
  standalone: false
})
export class TareaItemComponent implements OnInit {

  @Input() tarea!: Tarea;

  constructor() { }

  ngOnInit() {}
}
