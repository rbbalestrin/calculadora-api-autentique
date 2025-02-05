import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { computed, type Signal } from "@angular/core";

@Component({
  selector: "app-topbar",
  standalone: true,
  imports: [],
  templateUrl: "./topbar.component.html",
  styleUrl: "./topbar.component.scss",
})
export class TopbarComponent {
  @Input() showUSD!: Signal<boolean>;
  @Output() toggleCurrency = new EventEmitter<boolean>();

  onToggle(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.toggleCurrency.emit(checked);
  }
}
