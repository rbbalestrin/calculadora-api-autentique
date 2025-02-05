import { Injectable } from "@angular/core";
import { SignatoryMethod } from "./app.component"; // ou o caminho correto
import { PriceService } from "./price-service";
import { PriceTable } from "./price-config";

@Injectable({ providedIn: "root" })
export class CostCalculationService {
  constructor(private priceService: PriceService) {}

  calculateSignatoryCost(signatory: SignatoryMethod): number {
    const prices: PriceTable = this.priceService.currentPrices;
    let cost = 0;
    if (signatory.email) {
      cost += prices.emailSignatureRequest;
    }
    if (signatory.whatsapp) {
      cost += prices.whatsappSignatureRequest;
    }
    if (signatory.sms) {
      cost += prices.smsSignatureRequest;
    }
    if (signatory.linkEmail) {
      cost += prices.emailLinkSignatureRequest;
    }
    if (signatory.linkSms) {
      cost += prices.smsLinkSignatureRequest;
    }
    if (signatory.linkWhatsapp) {
      cost += prices.whatsappLinkSignatureRequest;
    }
    if (signatory.smsValidation) {
      cost += prices.smsValidation;
    }
    return cost;
  }

  calculateTotalCost(signatories: SignatoryMethod[]): number {
    const prices: PriceTable = this.priceService.currentPrices;
    let total = prices.createDocument;
    for (const signatory of signatories) {
      total += this.calculateSignatoryCost(signatory);
    }
    return total;
  }
}
