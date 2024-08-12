import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastCtrl: ToastController) {}
  async presentToast(
    message: string,
    duration: number,
    position: any,
    color: string
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position,
      color,
    });
    toast.present();
  }
  success(message: string) {
    this.presentToast(message, 8000, 'top', 'success');
  }
  error(message: string) {
    this.presentToast(message, 8000, 'top', 'danger');
  }
}
