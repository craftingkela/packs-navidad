import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recibido',
  standalone: true,
  templateUrl: './recibido.component.html',
  styleUrl: './recibido.component.css'
})
export class RecibidoComponent {
  constructor(private router: Router) { }

  volverAlInicio() {
    this.router.navigate(['/']);
  }
}
