import { Injectable } from "@angular/core";
import { PRICE_CONFIG, PriceConfig } from "./price-config";
import { SignatoryMethod } from "./app.component";

@Injectable({ providedIn: "root" })
export class CostCalculationService {
  private prices: PriceConfig = PRICE_CONFIG;

  calculateSignatoryCost(signatory: SignatoryMethod): number {
    let cost = 0;
    if (signatory.email) {
      cost += this.prices.emailSignatureRequest;
    }
    if (signatory.whatsapp) {
      cost += this.prices.whatsappSignatureRequest;
    }
    if (signatory.sms) {
      cost += this.prices.smsSignatureRequest;
    }
    if (signatory.linkEmail) {
      cost += this.prices.emailLinkSignatureRequest;
    }
    if (signatory.linkSms) {
      cost += this.prices.smsLinkSignatureRequest;
    }
    if (signatory.linkWhatsapp) {
      cost += this.prices.whatsappLinkSignatureRequest;
    }
    if (signatory.smsValidation) {
      cost += this.prices.smsValidation;
    }
    return cost;
  }

  calculateTotalCost(signatories: SignatoryMethod[]): number {
    let total = this.prices.createDocument;
    for (const signatory of signatories) {
      total += this.calculateSignatoryCost(signatory);
    }
    return total;
  }
}
