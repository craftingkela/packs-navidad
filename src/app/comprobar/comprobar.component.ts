import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PedidoService } from '../services/pedido.service';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-comprobar',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent],
  templateUrl: './comprobar.component.html',
  styleUrls: ['./comprobar.component.css']
})
export class ComprobarComponent implements OnInit {
  pack: any = null;
  opcion: any = null;
  telas: any = null;
  contacto: any = null;
  envio: any = null;

  constructor(private pedidoService: PedidoService, private router: Router) { }

  ngOnInit() {
    this.pack = this.pedidoService.getPack();
    this.opcion = this.pedidoService.getOpcion(); // 🔹 Aquí usamos PedidoService
    this.telas = this.pedidoService.getTelas();
    this.contacto = this.pedidoService.getContacto();
    this.envio = this.pedidoService.getEnvio();  // 🔹 AHORA SÍ CARGAMOS ENVÍO
  }

  volverAlInicio() {
    this.router.navigate(['/']); // te lleva a la página principal
  }


  volver() {
    this.router.navigate(['/envio']); // 🔹 O a /contacto según tu flujo exacto
  }

  confirmar() {
    if (!this.pack || !this.telas || !this.contacto || !this.envio) {
      alert('Faltan datos del pedido.');
      return;
    }

    const direccionCompleta =
      this.envio.metodoEnvio === 'correos'
        ? `${this.envio.direccion.calle}, ${this.envio.direccion.numero}, ${this.envio.direccion.puerta || ''}, ${this.envio.direccion.cp}, ${this.envio.direccion.ciudad}`
        : '';

    const templateParams = {
      // PACK
      pack: this.pack?.nombre,
      opcion: this.opcion?.opcion,

      // TELAS
      telaExterior: this.telas?.exterior?.nombre,
      telaForro: this.telas?.forro?.nombre,

      // CONTACTO
      nombre: this.contacto?.nombre,
      apellido: this.contacto?.apellido,
      correo: this.contacto?.correo,
      telefono: this.contacto?.telefono,

      // ENVÍO (NUEVO)
      metodoEnvio: this.envio?.metodoEnvio,
      ciudadEntrega: this.envio?.ciudadEntrega,
      direccion: direccionCompleta,
      Aplicación: this.envio?.plataforma,

      // Anotaciones del usuario
      anotaciones: this.contacto?.anotaciones
    };

    emailjs.send(
      'emailscraftingkela',
      'template_ncrz61p',
      templateParams,
      '_M5g0U672foqjwPA-'
    )


      .then((response) => {
        console.log('Correo enviado!', response.status, response.text);

        this.router.navigate(['/recibido']);

      })
      .catch((err) => {
        console.error('Error enviando correo:', err);
        alert('Error enviando correo. Intenta de nuevo.');
      });


  }
}
