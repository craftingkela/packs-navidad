import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ProgressBarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'packs_navidad';

  constructor(private router: Router) { }

  mostrarBarraProgreso(): boolean {
    const ruta = this.router.url.replace('/', '');
    const rutasConBarra = ['productos', 'telas', 'envio', 'contacto', 'comprobar'];
    return rutasConBarra.includes(ruta);
  }
}
