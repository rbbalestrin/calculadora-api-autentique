// price-config.ts
export interface PriceConfig {
  createDocument: number;
  emailSignatureRequest: number;
  whatsappSignatureRequest: number;
  smsSignatureRequest: number;
  emailLinkSignatureRequest: number;
  smsLinkSignatureRequest: number;
  whatsappLinkSignatureRequest: number;
  smsValidation: number;
}

export const PRICE_CONFIG: PriceConfig = {
  createDocument: 0.01,
  emailSignatureRequest: 0.002,
  whatsappSignatureRequest: 0.02,
  smsSignatureRequest: 0.03,
  emailLinkSignatureRequest: 0.002,
  smsLinkSignatureRequest: 0.03,
  whatsappLinkSignatureRequest: 0.05,
  smsValidation: 0.03,
};
