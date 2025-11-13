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
  telas: any = null;
  contacto: any = null;

  constructor(private pedidoService: PedidoService, private router: Router) { }

  ngOnInit() {
    this.pack = this.pedidoService.getPack();
    this.telas = this.pedidoService.getTelas();
    this.contacto = this.pedidoService.getContacto();
  }

  volver() {
    this.router.navigate(['/contacto']);
  }

  confirmar() {
    if (!this.pack || !this.telas) {
      alert('Faltan datos del pedido.');
      return;
    }

    const templateParams = {
      pack: this.pack?.nombre,
      telaExterior: this.telas?.exterior?.nombre,
      telaForro: this.telas?.forro?.nombre,
      nombre: this.contacto?.nombre,
      apellido: this.contacto?.apellido,
      contacto: this.contacto?.contacto,
      metodoEnvio: this.contacto?.metodoEnvio,
      ciudadEntrega: this.contacto?.ciudadEntrega,
      anotaciones: this.contacto?.anotaciones,
      direccion: `${this.contacto?.direccion.calle}, ${this.contacto?.direccion.numero}, ${this.contacto?.direccion.puerta}, ${this.contacto?.direccion.cp}, ${this.contacto?.direccion.ciudad}`,
      plataforma: this.contacto?.plataforma
    };


    emailjs.send(
      'emailscraftingkela',      // tu Service ID
      'template_ncrz61p',     // tu Template ID
      templateParams,
      '_M5g0U672foqjwPA-'       // tu Public Key
    )
      .then((response) => {
        console.log('Correo enviado!', response.status, response.text);
        alert('Pedido confirmado y correo enviado!');
        // Opcional: redirigir a home
        this.router.navigate(['/']);
      }, (err) => {
        console.error('Error enviando correo:', err);
        alert('Error enviando correo. Intenta de nuevo.');
      });
  }
}
