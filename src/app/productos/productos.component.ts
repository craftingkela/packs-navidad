import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [ProgressBarComponent, FormsModule, CommonModule,],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  packs = [
    {
      nombre: 'Pack Bookworm',
      descripcion: 'Una funda para libros con cierre de botón. Un marcapáginas y portabolis a juego',
      precio: 20,
      imagen: 'assets/packs/basico.jpg'
    },
    {
      nombre: 'Pack Beauty',
      descripcion: 'Neceser cuadrado, bolsa para guardar brochas y coletero a juego.',
      precio: 20,
      imagen: 'assets/packs/deluxe.jpg'
    },
    {
      nombre: 'Pack Shopper',
      descripcion: 'Tote bag para tus compras, un monedero y un llavero a juego.',
      precio: 20,
      imagen: 'assets/packs/premium.jpg'
    }
  ];

  packSeleccionado: any = null;

  constructor(private router: Router, private pedidoService: PedidoService) { }

  seleccionarPack(pack: any) {
    this.packSeleccionado = pack;
    this.pedidoService.setPack(pack); // ✅ Guardamos el pack seleccionado
  }
  volver() {
    this.router.navigate(['']); // o la ruta anterior
  }

  siguiente() {
    if (this.packSeleccionado) {
      this.router.navigate(['/telas']);
    }
  }
}
