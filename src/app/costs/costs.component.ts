import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { CostCalculationService } from "../calculation.service";
import { type Signal } from "@angular/core";
import { PriceService } from "../price-service";

@Component({
  selector: "app-costs",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./costs.component.html",
  styleUrls: ["./costs.component.scss"],
})
export class CostsComponent {
  @Input() documentsPerDay!: Signal<number>;
  @Input() workingDaysPerMonth!: Signal<number>;
  @Input() signatories!: Signal<any[]>;

  constructor(
    private costService: CostCalculationService,
    public priceService: PriceService,
  ) {}

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

  // Utiliza o método centralizado do PriceService para formatar o valor
  formatCurrency(value: number): string {
    return this.priceService.formatCurrency(value);
  }
}
