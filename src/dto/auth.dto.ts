import { IsNotEmpty, IsEmail, IsString } from "class-validator";


export class AuthDto
{
    @IsEmail()      //class validator
    @IsNotEmpty()
    email: String;

    @IsString()
    @IsNotEmpty()
    password: String;
}