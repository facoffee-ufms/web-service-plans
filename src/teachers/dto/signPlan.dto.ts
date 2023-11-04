import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class SignPlanDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  planId: string;
}
