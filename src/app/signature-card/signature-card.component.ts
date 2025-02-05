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

  // Vamos manter o array de métodos que será atualizado pelo effect.
  methods: { key: string; label: string; price: number }[] = [];

  // Definindo o effect como um field initializer garante que ele seja executado
  // no contexto de injeção (sem precisar usar runInInjectionContext no ngOnInit).
  // OBS: Cuidado com efeitos que recriam arrays a cada execução.
  private updateMethodsEffect = effect(() => {
    const prices: PriceTable = this.priceService.currentPrices();
    // Se você atualizar o array somente se os preços realmente mudarem, evita loop:
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
    // Se o array mudou (você pode implementar uma comparação simples) ou simplesmente
    // atribuir sempre, mas isso pode disparar mudanças se a detecção de mudança
    // comparar referências.
    this.methods = newMethods;
    // Você pode usar um console.log para depurar:
    console.log("Métodos atualizados:", newMethods);
  });

  constructor(public priceService: PriceService) {
    // O efeito acima, definido como field initializer, já está sendo executado
    // dentro do contexto de injeção (pois o construtor é um contexto injetável).
  }

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
