import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PRICE_CONFIG } from "../price-config";

@Component({
  standalone: true,
  selector: "app-signature-card",
  imports: [CommonModule, FormsModule],
  templateUrl: "./signature-card.component.html",
  styleUrl: "./signature-card.component.scss",
})
export class SignatureCardComponent {
  @Input() signatory: any;
  @Input() index!: number;
  @Output() cardUpdate = new EventEmitter<{ index: number; signatory: any }>();
  @Output() removeSignatory = new EventEmitter<void>();

  // local price values – these could be passed in or imported from a shared constant file
  prices = {
    email: PRICE_CONFIG.emailSignatureRequest,
    whatsapp: PRICE_CONFIG.whatsappSignatureRequest,
    sms: PRICE_CONFIG.smsSignatureRequest,
    linkEmail: PRICE_CONFIG.emailLinkSignatureRequest,
    linkSms: PRICE_CONFIG.smsLinkSignatureRequest,
    linkWhatsapp: PRICE_CONFIG.whatsappLinkSignatureRequest,
    smsValidation: PRICE_CONFIG.smsValidation,
  };

  methods = [
    { key: "email", label: "Email", price: this.prices.email },
    { key: "whatsapp", label: "WhatsApp", price: this.prices.whatsapp },
    { key: "sms", label: "SMS", price: this.prices.sms },
    { key: "linkEmail", label: "Link por Email", price: this.prices.linkEmail },
    { key: "linkSms", label: "Link por SMS", price: this.prices.linkSms },
    {
      key: "linkWhatsapp",
      label: "Link por WhatsApp",
      price: this.prices.linkWhatsapp,
    },
    {
      key: "smsValidation",
      label: "Validação por SMS",
      price: this.prices.smsValidation,
    },
  ];

  toggle() {
    this.signatory.expanded = !this.signatory.expanded;
    this.emitUpdate();
  }

  getSelectedMethods(): string {
    const selected = [];
    if (this.signatory.email || this.signatory.linkEmail) {
      selected.push("Email");
    }
    if (this.signatory.whatsapp || this.signatory.linkWhatsapp) {
      selected.push("WhatsApp");
    }
    if (
      this.signatory.sms ||
      this.signatory.linkSms ||
      this.signatory.smsValidation
    ) {
      selected.push("SMS");
    }
    return selected.length ? selected.join(" • ") : "Nenhum método selecionado";
  }

  calculateCost(): number {
    let cost = 0;
    for (const method of this.methods) {
      if (this.signatory[method.key]) {
        cost += method.price;
      }
    }
    return cost;
  }

  formatCurrency(value: number): string {
    return `R$ ${value.toFixed(3)}`;
  }

  remove(event: Event) {
    event.stopPropagation();
    this.removeSignatory.emit();
  }

  emitUpdate() {
    this.cardUpdate.emit({ index: this.index, signatory: this.signatory });
  }
}
