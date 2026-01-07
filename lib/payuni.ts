import crypto from "crypto";

export interface PayUniOrder {
  MerTradeNo: string;
  TradeAmt: number;
  ProdDesc: string;
  ReturnURL?: string;
  NotifyURL?: string;
  BackURL?: string;
  UsrMail?: string;
  Credit?: number;
  LinePay?: number;
  JKoPay?: number;
  ATM?: number;
  CVS?: number;
}

export class PayUni {
  private merId: string;
  private hashKey: string;
  private hashIv: string;
  private apiUrl: string;

  constructor() {
    this.merId = process.env.PAYUNI_MERCHANT_ID || "";
    this.hashKey = process.env.PAYUNI_HASH_KEY || "";
    this.hashIv = process.env.PAYUNI_HASH_IV || "";
    this.apiUrl = process.env.PAYUNI_API_URL || "";
  }

  // 完全依照您提供的官方範例實作 encrypt
  encrypt(plaintext: string): string {
    const key = this.hashKey;
    const iv = new Uint8Array(Buffer.from(this.hashIv));
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

    let cipherText = cipher.update(plaintext, "utf8", "base64");
    cipherText += cipher.final("base64");

    const tag = cipher.getAuthTag().toString("base64");
    return Buffer.from(`${cipherText}:::${tag}`).toString("hex").trim();
  }

  // 完全依照您提供的官方範例實作 sha256
  sha256(encryptStr: string): string {
    const key = this.hashKey;
    const iv = this.hashIv;
    const hash = crypto.createHash("sha256").update(`${key}${encryptStr}${iv}`);
    return hash.digest("hex").toUpperCase();
  }

  generatePaymentParams(order: PayUniOrder) {
    const encryptData: any = {
      MerID: this.merId,
      ...order,
      Timestamp: Math.floor(Date.now() / 1000),
    };

    // 關鍵修正：將參數物件轉換為經過排序的 URL Query String
    const sortedKeys = Object.keys(encryptData).sort();
    const urlParams = new URLSearchParams();
    sortedKeys.forEach(key => {
      if (encryptData[key] !== undefined && encryptData[key] !== null) {
        urlParams.append(key, encryptData[key].toString());
      }
    });
    
    // 加密的是 Query String 而不是 JSON
    const encryptInfo = this.encrypt(urlParams.toString());
    const hashInfo = this.sha256(encryptInfo);

    return {
      MerID: this.merId,
      Version: "1.0",
      EncryptInfo: encryptInfo,
      HashInfo: hashInfo
    };
  }

  getPaymentUrl() {
    return this.apiUrl;
  }
}
