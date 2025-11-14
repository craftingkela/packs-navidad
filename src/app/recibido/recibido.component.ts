import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recibido',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recibido.component.html',
  styleUrls: ['./recibido.component.css'],
})
export class RecibidoComponent {
  mostrarPopup = true;

  constructor(private router: Router) { }

  cerrarPopup() {
    this.mostrarPopup = false;

    // 👇 Redirige a la home
    this.router.navigate(['/']);
  }
}
