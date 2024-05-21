import { IsString, IsUUID, Length, IsNumberString } from 'class-validator';

class CreateRuBankCardDto {
  @IsString()
  @Length(16)
  card_number: string;

  @IsString()
  @Length(4, 5)
  expiry_date: string;

  @IsNumberString()
  @Length(3, 4)
  cvc_cvv: string;
}

export default CreateRuBankCardDto;
