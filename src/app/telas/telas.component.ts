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
    { nombre: 'Tela de prueba', imagen: 'assets/rojo.jpg' },
    { nombre: 'Tela verde con renos', imagen: 'assets/verde.jpg' },
    { nombre: 'Tela blanca con copos', imagen: 'assets/telas/blanco.jpg' },
    { nombre: 'Tela azul con estrellas', imagen: 'assets/telas/azul.jpg' },
    { nombre: 'Tela dorada brillante', imagen: 'assets/telas/amarillo.jpg' },
    { nombre: 'Tela plateada con lunares', imagen: 'assets/telas/gris.jpg' },
    { nombre: 'Tela roja con bastones', imagen: 'assets/telas/lila.jpg' },
    { nombre: 'Tela verde con hojas', imagen: 'assets/telas/rosa.jpg' }
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
