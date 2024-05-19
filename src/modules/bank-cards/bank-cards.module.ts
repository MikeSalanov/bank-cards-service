import { Module } from '@nestjs/common';
import { BankCardsController } from './bank-cards.controller';
import { BankCardsService } from './bank-cards.service';

@Module({
  imports: [],
  controllers: [BankCardsController],
  providers: [BankCardsService],
})
export class BankCardsModule {}
