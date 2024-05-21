import * as crypto from 'crypto';

const input_key: string = process.env.KEY_ENCRYPT_RU_CARD as string;
const input_iv: string = process.env.IV_ENCRYPT_RU_CARD as string;

function encrypt(text: string) {
  const keyBuffer = Buffer.from(input_key, 'utf-8');
  const ivBuffer = Buffer.from(input_iv, 'utf-8');
  const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, ivBuffer);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: input_iv.toString(), encryptedData: encrypted };
}

function decrypt(encryptedData: string) {
  const keyBuffer = Buffer.from(input_key, 'utf-8');
  const ivBuffer = Buffer.from(input_iv, 'utf-8');
  const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, ivBuffer);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export { encrypt, decrypt };
