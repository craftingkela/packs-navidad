// pedido.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private pack: any = null;
  private telas: any = null;
  private contacto: any = null;  // <-- nuevo

  setPack(pack: any) { this.pack = pack; }
  getPack() { return this.pack; }

  setTelas(telas: any) { this.telas = telas; }
  getTelas() { return this.telas; }

  setContacto(contacto: any) { this.contacto = contacto; }
  getContacto() { return this.contacto; }
}
