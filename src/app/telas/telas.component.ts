import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-telas',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent],
  templateUrl: './telas.component.html',
  styleUrls: ['./telas.component.css']
})
export class TelasComponent implements OnInit {
  telas = [
    { nombre: 'Bruma roja', imagen: 'assets/rojo.png' },
    { nombre: 'Verde musgo', imagen: 'assets/verde.png' },
    { nombre: 'Blanco nieve', imagen: 'assets/blanco.png' },
    { nombre: 'Flores azules', imagen: 'assets/azul.png' },
    { nombre: 'Vichy amarillo', imagen: 'assets/amarillo.png' },
    { nombre: 'Gris Saeris', imagen: 'assets/gris.png' },
    { nombre: 'Vichy lila', imagen: 'assets/lila.png' },
    { nombre: 'Rosa con lunares', imagen: 'assets/rosa.png' }
  ];
  telaExterior: any = null;
  telaForro: any = null;

  constructor(
    private router: Router,
    private pedidoService: PedidoService
  ) { }

  ngOnInit() {
    console.log('Pack elegido:', this.pedidoService.getPack());

    // Recuperar telas si ya estaban seleccionadas antes
    const telasGuardadas = this.pedidoService.getTelas();
    if (telasGuardadas) {
      this.telaExterior = telasGuardadas.exterior;
      this.telaForro = telasGuardadas.forro;
    }
  }

  seleccionarTela(tipo: 'exterior' | 'forro', tela: any) {
    if (tipo === 'exterior') {
      this.telaExterior = tela;
      console.log('Seleccionada como exterior:', tela.nombre);
    } else {
      this.telaForro = tela;
      console.log('Seleccionada como forro:', tela.nombre);
    }

    // Guardar siempre que ambas estén seleccionadas
    if (this.telaExterior && this.telaForro) {
      this.pedidoService.setTelas({
        exterior: this.telaExterior,
        forro: this.telaForro
      });
    }
  }

  volverAlInicio() {
    this.router.navigate(['/']); // te lleva a la página principal
  }


  siguiente() {
    if (this.telaExterior && this.telaForro) { // Cambia la coma por &&
      this.router.navigate(['/contacto']);
    }
  }
  volver() {
    this.router.navigate(['/productos']);
  }

  // Getter para saber si se puede continuar
  get puedeContinuar() {
    return this.telaExterior && this.telaForro;
  }
}
