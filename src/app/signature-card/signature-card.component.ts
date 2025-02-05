import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PriceTable } from "../price-config";
import { PriceService } from "../price-service";
import { effect } from "@angular/core";

@Component({
  standalone: true,
  selector: "app-signature-card",
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./signature-card.component.html",
  styleUrls: ["./signature-card.component.scss"],
})
export class SignatureCardComponent {
  @Input() signatory: any;
  @Input() index!: number;

  @Output() cardUpdate = new EventEmitter<{ index: number; signatory: any }>();
  @Output() removeSignatory = new EventEmitter<void>();

  methods: { key: string; label: string; price: number }[] = [];

  private updateMethodsEffect = effect(() => {
    const prices: PriceTable = this.priceService.currentPrices();
    const newMethods = [
      {
        key: "email",
        label: "Solicitação de assinatura por email",
        price: prices.emailSignatureRequest,
      },
      {
        key: "whatsapp",
        label: "Solicitação de assinatura por Whatsapp",
        price: prices.whatsappSignatureRequest,
      },
      {
        key: "sms",
        label: "Solicitação de assinatura por SMS",
        price: prices.smsSignatureRequest,
      },
      {
        key: "linkEmail",
        label: "Solicitação de assinatura por link assinado por email",
        price: prices.emailLinkSignatureRequest,
      },
      {
        key: "linkSms",
        label: "Solicitação de assinatura por link assinado por SMS",
        price: prices.smsLinkSignatureRequest,
      },
      {
        key: "linkWhatsapp",
        label: "Solicitação de assinatura por link assinado por Whatsapp",
        price: prices.whatsappLinkSignatureRequest,
      },
      {
        key: "smsValidation",
        label: "Assinatura com validação adicional por SMS",
        price: prices.smsValidation,
      },
    ];
    this.methods = newMethods;
  });

  constructor(public priceService: PriceService) {}

  toggle() {
    this.signatory.expanded = !this.signatory.expanded;
    this.emitUpdate();
  }

  getSelectedMethods(): string {
    const selected: string[] = [];
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
    return this.priceService.formatCurrency(value);
  }

  remove(event: Event) {
    event.stopPropagation();
    this.removeSignatory.emit();
  }

  emitUpdate() {
    this.cardUpdate.emit({ index: this.index, signatory: this.signatory });
  }
}
