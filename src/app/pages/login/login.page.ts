import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private navCtrl: NavController, private modalCtrl: ModalController) {}

  async login() {
    try {
      await this.authService.login({ email: this.email, password: this.password });
      this.navCtrl.navigateRoot('/home');
    } catch (error) {
      console.error('Error de login:', error);

    }
  }

 async openRegisterModal() {
  const modal = await this.modalCtrl.create({
    component: RegisterPage,
    backdropDismiss: true
  });

  await modal.present();
}
}
