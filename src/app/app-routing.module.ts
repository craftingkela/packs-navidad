import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { TelasComponent } from './telas/telas.component';
import { EnvioComponent } from './envio/envio.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ComprobarComponent } from './comprobar/comprobar.component';
import { RecibidoComponent } from './recibido/recibido.component';

const routes: Routes = [
  { path: '', component: HomeComponent },           // landing (por defecto)
  { path: 'productos', component: ProductosComponent },
  { path: 'telas', component: TelasComponent },
  { path: 'envio', component: EnvioComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'comprobar', component: ComprobarComponent },
  { path: 'recibido', component: RecibidoComponent },
  { path: '**', redirectTo: '' } // fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
