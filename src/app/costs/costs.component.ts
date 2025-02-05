import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { CostCalculationService } from "../calculation.service";
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

  constructor(private costService: CostCalculationService) {}

  get totalCost(): number {
    return this.costService.calculateTotalCost(this.signatories());
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

  formatBRL(value: number): string {
    return `R$ ${value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  formatUSD(value: number): string {
    return `USD ${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}
