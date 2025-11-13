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

  mostrarErrores = false; // <-- para controlar la visualización de errores
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

  siguiente() {
    this.mostrarErrores = true; // activamos los estilos de error

    if (!this.puedeContinuar) return; // no dejar avanzar

    // Guardar datos en el servicio
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

  get puedeContinuar(): boolean {
    if (!this.nombre || !this.apellido || !this.correo || !this.metodoEnvio) return false;

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
}
