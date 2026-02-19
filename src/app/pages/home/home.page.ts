import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task';

@Component({
selector: 'app-home',
templateUrl: 'home.page.html',
styleUrls: ['home.page.scss'],
standalone: false
})
export class HomePage implements OnInit {

tareas: any[] = [];

constructor(private taskSrv: TaskService) {}

ngOnInit() {
this.cargarTareas();
}

cargarTareas() {
this.taskSrv.getTasks().subscribe({
next: (res) => {
this.tareas = res;
console.log('Tareas recibidas:', this.tareas);
},
error: (err) => {
console.error('Error al conectar con el Backend:', err);
}
});
}
}
