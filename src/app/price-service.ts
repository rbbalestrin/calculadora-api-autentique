// price.service.ts
import { Injectable, signal, type WritableSignal } from "@angular/core";
import { PRICE_CONFIG, PriceTable } from "./price-config";

@Injectable({ providedIn: "root" })
export class PriceService {
  // Flag global: true para USD, false para BRL.
  public showUSD: WritableSignal<boolean> = signal(true);

  // Retorna a tabela de preços conforme a moeda selecionada.
  get currentPrices(): PriceTable {
    return this.showUSD() ? PRICE_CONFIG.USD : PRICE_CONFIG.BRL;
  }

  // Alterna a moeda globalmente.
  toggleCurrency() {
    this.showUSD.set(!this.showUSD());
  }

  // Formata o valor conforme a moeda atual.
  formatCurrency(value: number): string {
    if (this.showUSD()) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
      }).format(value);
    } else {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        // Você pode ajustar as casas decimais conforme desejado.
        maximumFractionDigits: 3,
      }).format(value);
    }
  }

  // Se precisar formatar o valor na moeda oposta à selecionada
  formatAlternateCurrency(value: number): string {
    if (this.showUSD()) {
      // Alternativa: BRL
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
      }).format(value);
    } else {
      // Alternativa: USD
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    }
  }
}
