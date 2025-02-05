import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { type Signal } from "@angular/core";

@Component({
  selector: "app-frequency",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./frequency.component.html",
  styleUrl: "./frequency.component.scss",
})
export class FrequencyComponent {
  @Input() documentsPerDay!: Signal<number>;
  @Input() workingDaysPerMonth!: Signal<number>;
  @Output() updateFrequency = new EventEmitter<{
    documentsPerDay: number;
    workingDaysPerMonth: number;
  }>();

  onDocumentsPerDay(event: Event) {
    const value = parseInt((event.target as HTMLInputElement).value, 10);
    this.updateFrequency.emit({
      documentsPerDay: value,
      workingDaysPerMonth: this.workingDaysPerMonth(),
    });
  }

  onWorkingDays(event: Event) {
    const value = parseInt((event.target as HTMLInputElement).value, 10);
    this.updateFrequency.emit({
      documentsPerDay: this.documentsPerDay(),
      workingDaysPerMonth: value,
    });
  }
}
