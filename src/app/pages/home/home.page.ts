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
  // CAMBIO AQUÍ: Definimos el tipo para que el pipe keyvalue funcione
  tareasAgrupadas: { [key: string]: any[] } = {};
  nuevaTareaTitulo: string = '';
  esAdmin: boolean = false;

  constructor(private taskSrv: TaskService) {}

  ngOnInit() {
    this.esAdmin = localStorage.getItem('role') === 'admin';
    this.cargarTareas();
  }

  cargarTareas() {
    this.taskSrv.getTasks().subscribe({
      next: (res) => {
        this.tareas = res;
        if (this.esAdmin) {
          this.agruparPorUsuario(res);
        }
      },
      error: (err) => console.error(err)
    });
  }

agruparPorUsuario(lista: any[]) {
  this.tareasAgrupadas = {};
  this.tareasAgrupadas = lista.reduce((acc, tarea) => {

    const nombreUsuario = tarea.creador?.username || `ID: ${tarea.usuario_id}`;

    if (!acc[nombreUsuario]) {
      acc[nombreUsuario] = [];
    }
    acc[nombreUsuario].push(tarea);
    return acc;
  }, {});
}

  agregarTarea() {
    if (!this.nuevaTareaTitulo.trim()) return;

    const nuevaTarea = {
      titulo: this.nuevaTareaTitulo,
      descripcion: '',
      usuario_id: localStorage.getItem('userId') || 1
    };

    this.taskSrv.createTask(nuevaTarea).subscribe({
      next: (res) => {
        this.cargarTareas();
        this.nuevaTareaTitulo = '';
      },
      error: (err) => console.error(err)
    });
  }

  onTareaBorrada(id: number) {
    this.taskSrv.deleteTask(id).subscribe({
      next: () => this.cargarTareas(),
      error: (err) => console.error(err)
    });
  }

  onTareaEditada(tareaEditada: any) {
    this.taskSrv.updateTask(tareaEditada.id, tareaEditada).subscribe({
      next: () => this.cargarTareas(),
      error: (err) => console.error(err)
    });
  }
}
