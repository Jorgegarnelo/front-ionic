import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


import { HeaderComponent } from './header/header.component';
import { TareaItemComponent } from './tarea-item/tarea-item.component';

@NgModule({
  declarations: [
    HeaderComponent,
    TareaItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    HeaderComponent,
    TareaItemComponent
  ]
})
export class ComponentsModule { }
