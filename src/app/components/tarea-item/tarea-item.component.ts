import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tarea } from '../../shared/models/tarea.interface';
import { TaskService } from '../../services/task';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tarea-item',
  templateUrl: './tarea-item.component.html',
  styleUrls: ['./tarea-item.component.scss'],
  standalone: false
})
export class TareaItemComponent implements OnInit {

  @Input() tarea!: any;
  @Output() tareaBorrada = new EventEmitter<number>();
  @Output() tareaEditada = new EventEmitter<any>();

  userRole: string | null = '';

  constructor(
    private taskSrv: TaskService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.userRole = localStorage.getItem('role');
  }

  checkTarea(event: any) {
    const valor = event.detail.checked;
    const idSeguro = this.tarea.id as number;

    const datosActualizados = {
      ...this.tarea,
      estado: valor ? 'completada' : 'pendiente'
    };

    this.taskSrv.updateTask(idSeguro, datosActualizados).subscribe({
      next: () => {
        this.tarea.estado = datosActualizados.estado;
        this.tareaEditada.emit(datosActualizados);
      },
      error: (err) => console.error(err)
    });
  }

  async editarNombre() {
    const alert = await this.alertCtrl.create({
      header: 'Editar Tarea',
      inputs: [{
        name: 'titulo',
        type: 'text',
        value: this.tarea.titulo
      }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            const tareaActualizada = { ...this.tarea, titulo: data.titulo };
            this.tareaEditada.emit(tareaActualizada);
          }
        }
      ]
    });
    await alert.present();
  }

  eliminar() {
    this.tareaBorrada.emit(this.tarea.id);
  }
}
