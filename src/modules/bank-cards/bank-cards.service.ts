import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankCardsRu } from './entities/bank-cards-ru.entity';
import { BankCardsWorld } from './entities/bank-cards-world.entity';
import { encrypt, decrypt } from '../../utils/encDec';
import CreateRuBankCardDto from './dto/create-ru-bank-card.dto';
import * as crypto from 'crypto';
import Stripe from 'stripe';

@Injectable()
export class BankCardsService {
  private stripe: Stripe = new Stripe(
    process.env.STRIPE_PRIVATE_TOKEN as string,
    {
      apiVersion: '2024-04-10',
    },
  );

  constructor(
    @InjectRepository(BankCardsRu)
    private readonly bankCardsRuRepository: Repository<BankCardsRu>,
    @InjectRepository(BankCardsWorld)
    private readonly bankCardsWorldRepository: Repository<BankCardsWorld>,
  ) {}

  async toGetRuCards(
    userId: string,
  ): Promise<Pick<BankCardsRu, 'card_number' | 'expiry_date'>[]> {
    try {
      const ruUserCards: BankCardsRu[] = await this.bankCardsRuRepository.find({
        where: {
          user_id: userId,
        },
      });
      const parsedRuCards: Pick<BankCardsRu, 'card_number' | 'expiry_date'>[] =
        ruUserCards.map((card: BankCardsRu) => {
          const encryptedAndLast4NumbersOfCard: string[] =
            card.card_number.split('-');
          const decryptedCardNum: string = decrypt(
            encryptedAndLast4NumbersOfCard[0],
          );
          return {
            card_number: `${'*'.repeat(decryptedCardNum.length)}${encryptedAndLast4NumbersOfCard[1]}`,
            expiry_date: card.expiry_date,
          };
        });
      const worldUserCards: BankCardsWorld[] =
        await this.bankCardsWorldRepository.find({
          where: {
            user_id: userId,
          },
        });
      const parsedWorldUserCards: {
        card_number: string;
        expiry_date: string;
      }[] = worldUserCards.map((card: BankCardsWorld) => ({
        card_number: `${'*'.repeat(12)}${card.last_numbers}`,
        expiry_date: `${card.exp_month}/${card.exp_year.slice(-2)}`,
      }));
      return parsedRuCards.concat(parsedWorldUserCards);
    } catch (err) {
      throw new Error(err);
    }
  }

  async toCreateRuCard(
    newRuCardObj: CreateRuBankCardDto & { user_id: string },
  ): Promise<void> {
    try {
      const ruBankCard: BankCardsRu = this.bankCardsRuRepository.create({
        ...newRuCardObj,
        card_number: encrypt(
          newRuCardObj.card_number.slice(0, -4),
        ).encryptedData.concat('-' + newRuCardObj.card_number.slice(-4)),
        cvc_cvv: parseInt(newRuCardObj.cvc_cvv),
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      await this.bankCardsRuRepository.save(ruBankCard);
      return;
    } catch (err) {
      throw new Error(err);
    }
  }

  async toCreateWorldCard(newWorldCardObj: {
    payment_method_id: string;
    user_id: string;
  }): Promise<void> {
    try {
      const paymentInfo: Stripe.Response<Stripe.PaymentMethod> =
        await this.stripe.paymentMethods.retrieve(
          newWorldCardObj.payment_method_id,
        );
      const worldBankCard: BankCardsWorld =
        this.bankCardsWorldRepository.create({
          id: crypto.randomUUID(),
          exp_month: paymentInfo.card.exp_month.toString(),
          exp_year: paymentInfo.card.exp_year.toString(),
          payment_method_id: paymentInfo.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          user_id: newWorldCardObj.user_id,
          last_numbers: parseInt(paymentInfo.card.last4),
        });
      await this.bankCardsWorldRepository.save(worldBankCard);
      return;
    } catch (err) {
      throw new Error(err);
    }
  }
}
