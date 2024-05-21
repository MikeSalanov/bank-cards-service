import { Module } from '@nestjs/common';
import { BankCardsController } from './bank-cards.controller';
import { BankCardsService } from './bank-cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankCardsRu } from './entities/bank-cards-ru.entity';
import { BankCardsWorld } from './entities/bank-cards-world.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([BankCardsRu, BankCardsWorld]),
  ],
  controllers: [BankCardsController],
  providers: [BankCardsService],
})
export class BankCardsModule {}
