// pedido.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private pack: any = null;
  private opcion: any = null;
  private telas: any = null;
  private contacto: any = null;
  private envio: any = null;

  setPack(pack: any) { this.pack = pack; }
  getPack() { return this.pack; }

  setOpcion(opcion: any) { this.opcion = opcion; }
  getOpcion() { return this.opcion; }

  setTelas(telas: any) { this.telas = telas; }
  getTelas() { return this.telas; }

  setContacto(contacto: any) { this.contacto = contacto; }
  getContacto() { return this.contacto; }

  setEnvio(envio: any) { this.envio = envio; }
  getEnvio() { return this.envio; }
}
