import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule, ProgressBarComponent],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  constructor(private router: Router, private pedidoService: PedidoService) { }

  // Control de errores
  mostrarErrores = false;

  // Datos de contacto
  nombre = '';
  apellido = '';
  correo = '';
  telefono = '';

  // Envío
  metodoEnvio: string | null = null;

  // Subformularios
  ciudadEntrega = '';
  anotaciones = '';

  direccion = {
    calle: '',
    numero: '',
    puerta: '',
    cp: '',
    ciudad: ''
  };

  plataforma = '';

  // Navegación
  atras() {
    this.router.navigate(['/telas']);
  }

  siguiente(form: any) {
    this.mostrarErrores = true;

    if (form.invalid || !this.metodoEnvio || (this.metodoEnvio === 'mano' && !this.ciudadEntrega) ||
      (this.metodoEnvio === 'correos' &&
        (!this.direccion.calle || !this.direccion.numero || !this.direccion.cp || !this.direccion.ciudad)) ||
      (this.metodoEnvio === 'plataforma' && !this.plataforma)) {
      return;
    }

    this.pedidoService.setContacto({
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      telefono: this.telefono,
      metodoEnvio: this.metodoEnvio,
      ciudadEntrega: this.ciudadEntrega,
      anotaciones: this.anotaciones,
      direccion: this.direccion,
      plataforma: this.plataforma
    });

    this.router.navigate(['/comprobar']);
  }

  // Función para verificar todos los campos obligatorios
  camposValidos(): boolean {
    if (!this.nombre || !this.apellido || !this.correo || !this.metodoEnvio) {
      return false;
    }

    switch (this.metodoEnvio) {
      case 'mano':
        return !!this.ciudadEntrega;
      case 'correos':
        return !!this.direccion.calle &&
          !!this.direccion.numero &&
          !!this.direccion.puerta &&
          !!this.direccion.cp &&
          !!this.direccion.ciudad;
      case 'plataforma':
        return !!this.plataforma;
      default:
        return false;
    }
  }

  // Getter para activar el botón siguiente
  get puedeContinuar(): boolean {
    return this.camposValidos();
  }
}
