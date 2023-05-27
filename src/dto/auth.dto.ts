import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail() //class validator
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
