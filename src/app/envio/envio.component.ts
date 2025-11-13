import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
@Component({
  selector: 'app-envio',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent],
  templateUrl: './envio.component.html',
  styleUrl: './envio.component.css'
})
export class EnvioComponent {
  constructor(private router: Router) { }

  volver() {
    this.router.navigate(['/telas']);
  }

  siguiente() {
    this.router.navigate(['/contacto']);
  }
}
