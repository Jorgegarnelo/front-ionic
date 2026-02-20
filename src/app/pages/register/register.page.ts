import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  userData = {
    username: '',
    email: '',
    password: '',
    role: 'user'
  };

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {}

  async registrar() {
  try {
    await this.authService.register(this.userData);

    await this.modalCtrl.dismiss();
    this.presentToast('Registro con éxito. Ya puedes loguearte.');

  } catch (error) {
    console.error('Error en registro:', error);
    this.presentToast('Error al registrar usuario');
  }
}

 cerrar() {
  this.modalCtrl.dismiss();
}

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
