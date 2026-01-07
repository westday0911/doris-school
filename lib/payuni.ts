import crypto from "crypto";

export interface PayUniOrder {
  MerTradeNo: string;
  TradeAmt: number;      // 修正：OrderAmt -> TradeAmt
  ProdDesc: string;      // 修正：TradeDesc -> ProdDesc
  ReturnURL?: string;
  NotifyURL?: string;
  BackURL?: string;      // 新增：返回商店按鈕網址
  UsrMail?: string;      // 修正：Email -> UsrMail
  // 支付工具開關 (1=啟用)
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
    let url = process.env.PAYUNI_API_URL || "https://sandbox-api.payuni.com.tw/api/upp";
    
    
    this.apiUrl = url;
  }

  // AES-256-GCM 加密 (符合官方範例)
  encrypt(plaintext: string): string {
    const key = this.hashKey;
    const iv = new Uint8Array(Buffer.from(this.hashIv));
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

    let cipherText = cipher.update(plaintext, "utf8", "base64");
    cipherText += cipher.final("base64");

    const tag = cipher.getAuthTag().toString("base64");
    return Buffer.from(`${cipherText}:::${tag}`).toString("hex").trim();
  }

  // AES-256-GCM 解密 (符合官方範例)
  decrypt(encryptStr: string): string {
    const key = this.hashKey;
    const iv = new Uint8Array(Buffer.from(this.hashIv));
    const [encryptData, tag] = Buffer.from(encryptStr, "hex").toString().split(":::");

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(new Uint8Array(Buffer.from(tag, "base64")));

    let decipherText = decipher.update(encryptData, "base64", "utf8");
    decipherText += decipher.final("utf8");

    return decipherText;
  }

  // SHA256 雜湊 (符合官方範例)
  sha256(encryptStr: string): string {
    const key = this.hashKey;
    const iv = this.hashIv;
    const hash = crypto.createHash("sha256").update(`${key}${encryptStr}${iv}`);
    return hash.digest("hex").toUpperCase();
  }

  generatePaymentParams(order: PayUniOrder) {
    const encryptData = {
      MerID: this.merId,
      ...order,
      Timestamp: Math.floor(Date.now() / 1000),
    };

    const encryptInfo = this.encrypt(JSON.stringify(encryptData));
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
