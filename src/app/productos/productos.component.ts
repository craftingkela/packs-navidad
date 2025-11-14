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
      descripcion: [
        'Funda para libros con cierre de lazo o botón',
        'Un marcapáginas',
        'Portabolis a juego'
      ],
      precio: 20,
      imagen: 'assets/1.png',
      opciones: [
        { nombre: 'Funda de botón', imagen: 'assets/2.png' },
        { nombre: 'Funda de lazo', imagen: 'assets/3.png' }
      ]
    },
    {
      nombre: 'Pack Beauty',
      descripcion: [
        'Neceser cuadrado',
        'Bolsa para guardar brochas',
        'Coletero o portacacao'
      ],
      precio: 20,
      imagen: 'assets/2.png',
      opciones: [
        { nombre: 'Coletero', imagen: 'assets/1.png' },
        { nombre: 'Portacacao', imagen: 'assets/1.png' }
      ]
    },
    {
      nombre: 'Pack Shopper',
      descripcion: [
        'Tote bag para tus compras',
        'Monedero',
        'Llavero o portacacao'
      ],
      precio: 20,
      imagen: 'assets/3.png',
      opciones: [
        { nombre: 'Llavero', imagen: 'assets/3.png' },
        { nombre: 'Portacacao', imagen: 'assets/2.png' }
      ]
    }
  ];

  packSeleccionado: any = null;
  opcionSeleccionada: any = null;


  constructor(private router: Router, private pedidoService: PedidoService) { }

  seleccionarPack(pack: any) {
    this.packSeleccionado = pack;
    this.opcionSeleccionada = null; // Resetear opción al cambiar de pack
    this.pedidoService.setPack(pack); // ✅ Guardamos el pack seleccionado
  }

  seleccionarOpcion(opcion: any) {
    this.opcionSeleccionada = opcion;
    console.log('Opción seleccionada:', opcion.nombre);
    this.pedidoService.setOpcion(opcion); // Guardamos opción seleccionada
  }


  volverAlInicio() {
    this.router.navigate(['/']); // te lleva a la página principal
  }

  volver() {
    this.router.navigate(['']); // o la ruta anterior
  }

  siguiente() {
    if (this.packSeleccionado && this.opcionSeleccionada) {
      this.router.navigate(['/telas']);
    }
  }
}
