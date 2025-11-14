import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-envio',
  standalone: true,
  imports: [CommonModule, FormsModule, ProgressBarComponent],
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.css']
})
export class EnvioComponent {

  mostrarErrores = false;

  metodoEnvio: string | null = null;

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

  constructor(private router: Router, private pedidoService: PedidoService) { }

  atras() {
    this.router.navigate(['/contacto']);
  }

  volverAlInicio() {
    this.router.navigate(['/']); // te lleva a la página principal
  }


  siguiente(form: any) {
    this.mostrarErrores = true;

    const invalido =
      form.invalid ||
      !this.metodoEnvio ||
      (this.metodoEnvio === 'mano' && !this.ciudadEntrega) ||
      (this.metodoEnvio === 'correos' &&
        (!this.direccion.calle || !this.direccion.numero || !this.direccion.cp || !this.direccion.ciudad)) ||
      (this.metodoEnvio === 'plataforma' && !this.plataforma);

    if (invalido) return;

    this.pedidoService.setEnvio({
      metodoEnvio: this.metodoEnvio,
      ciudadEntrega: this.ciudadEntrega,
      direccion: this.direccion,
      plataforma: this.plataforma,
      anotaciones: this.anotaciones
    });

    this.router.navigate(['/comprobar']);
  }
}
