import {
  Controller,
  Get,
  Request,
  HttpCode,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { BankCardsService } from './bank-cards.service';
import RequestWithUserIdInterface from '../../interfaces/RequestWithUserId';
import CreateRuBankCardDto from './dto/create-ru-bank-card.dto';
import CreateWorldBankCardDto from './dto/create-world-bank-card.dto';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BankCardsRu } from './entities/bank-cards-ru.entity';

@ApiTags('bank-cards-controller')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('accessToken')
@Controller('bank-cards')
export class BankCardsController {
  constructor(private readonly bankCardsService: BankCardsService) {}

  @HttpCode(200)
  @Get('/')
  getBankCards(
    @Request() req: RequestWithUserIdInterface,
  ): Promise<Pick<BankCardsRu, 'card_number' | 'expiry_date'>[]> {
    return this.bankCardsService.toGetRuCards(req.user_id);
  }

  @HttpCode(201)
  @Post('/ru')
  toCreateRuCard(
    @Request() req: RequestWithUserIdInterface,
    @Body() body: CreateRuBankCardDto,
  ): Promise<void> {
    return this.bankCardsService.toCreateRuCard({
      user_id: req.user_id,
      ...body,
    });
  }

  @HttpCode(201)
  @Post('/world')
  toCreateWorldCard(
    @Request() req: RequestWithUserIdInterface,
    @Body() body: CreateWorldBankCardDto,
  ): Promise<void> {
    return this.bankCardsService.toCreateWorldCard({
      user_id: req.user_id,
      ...body,
    });
  }
}
