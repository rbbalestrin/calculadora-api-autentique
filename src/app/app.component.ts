import { Component, signal } from "@angular/core";
import { platformBrowser } from "@angular/platform-browser";
import { bootstrapApplication } from "@angular/platform-browser";
import { TopbarComponent } from "./topbar/topbar.component";
import { FrequencyComponent } from "./frequency/frequency.component";
import { CostsComponent } from "./costs/costs.component";
import { SignaturesComponent } from "./signatures/signatures.component";
import { CommonModule } from "@angular/common";

export interface SignatoryMethod {
  email: boolean;
  whatsapp: boolean;
  sms: boolean;
  linkEmail: boolean;
  linkSms: boolean;
  linkWhatsapp: boolean;
  smsValidation: boolean;
  expanded: boolean;
}

@Component({
  standalone: true,
  selector: "app-root",
  imports: [
    CommonModule,
    TopbarComponent,
    FrequencyComponent,
    CostsComponent,
    SignaturesComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "calculadora-api";
  prices = {
    createDocument: 0.06,
    email: 0.013,
    whatsapp: 0.12,
    sms: 0.16,
    linkEmail: 0.013,
    linkSms: 0.16,
    linkWhatsapp: 0.3,
    smsValidation: 0.16,
  };

  // Signals for reactive state
  showUSD = signal(false);
  documentsPerDay = signal(1);
  workingDaysPerMonth = signal(22);
  signatories = signal<SignatoryMethod[]>([]);

  toggleCurrency(newValue: boolean) {
    this.showUSD.set(newValue);
  }

  updateFrequency({
    documentsPerDay,
    workingDaysPerMonth,
  }: {
    documentsPerDay: number;
    workingDaysPerMonth: number;
  }) {
    this.documentsPerDay.set(documentsPerDay);
    this.workingDaysPerMonth.set(workingDaysPerMonth);
  }

  addSignatory() {
    const newSignatory: SignatoryMethod = {
      email: false,
      whatsapp: false,
      sms: false,
      linkEmail: false,
      linkSms: false,
      linkWhatsapp: false,
      smsValidation: false,
      expanded: false,
    };
    this.signatories.update((s) => [...s, newSignatory]);
  }

  updateSignatory({
    index,
    signatory,
  }: {
    index: number;
    signatory: SignatoryMethod;
  }) {
    this.signatories.update((s: SignatoryMethod[]) => {
      const updated = [...s];
      updated[index] = signatory;
      return updated;
    });
  }

  removeSignatory(index: number) {
    this.signatories.update((s) => {
      s.splice(index, 1);
      return s;
    });
  }
}
