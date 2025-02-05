import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

interface Signer {
  method: string;
}

@Component({
  standalone: true,
  selector: "app-calculator",
  imports: [FormsModule],
  templateUrl: "./calculator.component.html",
  styleUrl: "./calculator.component.scss",
})
export class CalculatorComponent {
  // Preço fixo para criar o documento
  readonly basePrice: number = 0.06;

  // Tabela de preços para os métodos
  readonly prices: { [key: string]: number } = {
    email: 0.013,
    whatsapp: 0.12,
    sms: 0.16,
    linkEmail: 0.013,
    linkSMS: 0.16,
    linkWhatsapp: 0.3,
    smsValidation: 0.16,
  };

  // Array para armazenar os signatários
  signers: Signer[] = [];

  // Lista dos métodos disponíveis para seleção
  methods = [
    { value: "email", label: "Solicitação de assinatura por email (R$ 0,013)" },
    {
      value: "whatsapp",
      label: "Solicitação de assinatura por Whatsapp (R$ 0,12)",
    },
    { value: "sms", label: "Solicitação de assinatura por SMS (R$ 0,16)" },
    {
      value: "linkEmail",
      label: "Solicitação de assinatura por link assinado por email (R$ 0,013)",
    },
    {
      value: "linkSMS",
      label: "Solicitação de assinatura por link assinado por SMS (R$ 0,16)",
    },
    {
      value: "linkWhatsapp",
      label:
        "Solicitação de assinatura por link assinado por Whatsapp (R$ 0,30)",
    },
    {
      value: "smsValidation",
      label: "Assinatura com validação adicional por SMS (R$ 0,16)",
    },
  ];

  constructor() {
    // Inicialmente adiciona um signatário
    this.addSigner();
  }

  // Adiciona um novo signatário
  addSigner() {
    this.signers.push({ method: "" });
  }

  // Remove um signatário da lista
  removeSigner(index: number) {
    this.signers.splice(index, 1);
  }

  // Calcula o custo total do documento
  calcularTotal(): number {
    let total = this.basePrice;
    for (let signer of this.signers) {
      if (signer.method && this.prices[signer.method]) {
        total += this.prices[signer.method];
      }
    }
    return total;
  }
}
