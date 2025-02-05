// price-config.ts
export interface PriceTable {
  createDocument: number;
  emailSignatureRequest: number;
  whatsappSignatureRequest: number;
  smsSignatureRequest: number;
  emailLinkSignatureRequest: number;
  smsLinkSignatureRequest: number;
  whatsappLinkSignatureRequest: number;
  smsValidation: number;
}

export const PRICE_CONFIG = {
  USD: <PriceTable>{
    createDocument: 0.01,
    emailSignatureRequest: 0.002,
    whatsappSignatureRequest: 0.02,
    smsSignatureRequest: 0.03,
    emailLinkSignatureRequest: 0.002,
    smsLinkSignatureRequest: 0.03,
    whatsappLinkSignatureRequest: 0.05,
    smsValidation: 0.03,
  },
  BRL: <PriceTable>{
    createDocument: 0.06,
    emailSignatureRequest: 0.013,
    whatsappSignatureRequest: 0.12,
    smsSignatureRequest: 0.16,
    emailLinkSignatureRequest: 0.013,
    smsLinkSignatureRequest: 0.16,
    whatsappLinkSignatureRequest: 0.3,
    smsValidation: 0.16,
  },
};
