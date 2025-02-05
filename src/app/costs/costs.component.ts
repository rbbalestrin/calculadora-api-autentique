import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { type Signal } from "@angular/core";

@Component({
  selector: "app-costs",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./costs.component.html",
  styleUrl: "./costs.component.scss",
})
export class CostsComponent {
  @Input() documentsPerDay!: Signal<number>;
  @Input() workingDaysPerMonth!: Signal<number>;
  @Input() signatories!: Signal<any[]>;
  @Input() prices!: any;
  @Input() showUSD!: Signal<boolean>;

  get totalCost(): number {
    let total = this.prices.createDocument;
    for (const signatory of this.signatories()) {
      total += this.calculateSignatoryCost(signatory);
    }
    return total;
  }

  calculateSignatoryCost(signatory: any): number {
    let cost = 0;
    if (signatory.email) {
      cost += this.prices.email;
    }
    if (signatory.whatsapp) {
      cost += this.prices.whatsapp;
    }
    if (signatory.sms) {
      cost += this.prices.sms;
    }
    if (signatory.linkEmail) {
      cost += this.prices.linkEmail;
    }
    if (signatory.linkSms) {
      cost += this.prices.linkSms;
    }
    if (signatory.linkWhatsapp) {
      cost += this.prices.linkWhatsapp;
    }
    if (signatory.smsValidation) {
      cost += this.prices.smsValidation;
    }
    return cost;
  }

  get costData() {
    return [
      {
        title: "Custo por Documento",
        value: this.totalCost,
      },
      {
        title: "Custo Diário Estimado",
        value: this.totalCost * this.documentsPerDay(),
      },
      {
        title: "Custo Mensal Estimado",
        value:
          this.totalCost * this.documentsPerDay() * this.workingDaysPerMonth(),
      },
    ];
  }

  formatCurrency(value: number): string {
    if (this.showUSD()) {
      return `USD ${(value / 5).toFixed(3)}`;
    }
    return `R$ ${value.toFixed(3)}`;
  }

  formatUSD(value: number): string {
    return `USD ${(value / 5).toFixed(3)}`;
  }

  formatBRL(value: number): string {
    return `R$ ${value.toFixed(3)}`;
  }
}
