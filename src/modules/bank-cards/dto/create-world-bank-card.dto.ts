import { IsString } from 'class-validator';

class CreateWorldBankCardDto {
  @IsString()
  payment_method_id: string;
}

export default CreateWorldBankCardDto;
