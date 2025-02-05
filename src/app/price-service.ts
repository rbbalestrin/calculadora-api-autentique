// price.service.ts
import { Injectable, signal, type WritableSignal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class PriceService {
  // Flag global que indica se os preços serão exibidos em USD (true) ou BRL (false)
  public showUSD: WritableSignal<boolean> = signal(true);

  // Preços base em USD
  prices = {
    createDocument: 0.01,
    emailSignatureRequest: 0.002,
    whatsappSignatureRequest: 0.02,
    smsSignatureRequest: 0.03,
    emailLinkSignatureRequest: 0.002,
    smsLinkSignatureRequest: 0.03,
    whatsappLinkSignatureRequest: 0.05,
    smsValidation: 0.03,
  };

  // Taxa de conversão: 1 USD = 5 BRL (por exemplo)
  conversionRate = 5;

  // Método para alternar a moeda globalmente
  toggleCurrency() {
    this.showUSD.set(!this.showUSD());
  }

  // Formata um valor com base na moeda atual
  formatCurrency(value: number): string {
    if (this.showUSD()) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      }).format(value);
    } else {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      }).format(value * this.conversionRate);
    }
  }
}
