import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(private router: Router) { }

  irAProductos() {
    // navega a /productos y añade entrada en historial
    this.router.navigate(['/productos']);
  }
}
