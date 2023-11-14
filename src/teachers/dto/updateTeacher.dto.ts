import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateTeacherDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  cpf: string;

  @IsOptional()
  @IsString()
  planId: string;
}
