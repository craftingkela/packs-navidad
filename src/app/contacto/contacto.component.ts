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

  mostrarErrores = false;

  // SOLO datos de contacto
  nombre = '';
  apellido = '';
  correo = '';
  telefono = '';

  atras() {
    this.router.navigate(['/telas']);
  }

  volverAlInicio() {
    this.router.navigate(['/']); // te lleva a la página principal
  }


  siguiente(form: any) {
    this.mostrarErrores = true;

    if (form.invalid) return;

    // Guardamos solo los datos de contacto
    this.pedidoService.setContacto({
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      telefono: this.telefono
    });

    this.router.navigate(['/envio']);
  }

}
