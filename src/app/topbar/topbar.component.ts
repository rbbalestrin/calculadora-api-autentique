import { Component, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PriceService } from "../price-service";

@Component({
  selector: "app-topbar",
  standalone: true,
  imports: [],
  templateUrl: "./topbar.component.html",
  styleUrl: "./topbar.component.scss",
})
export class TopbarComponent {
  constructor(public priceService: PriceService) {}

  onToggle(event: Event) {
    // Ao alternar, chama o método que inverte a flag
    this.priceService.toggleCurrency();
  }
}
