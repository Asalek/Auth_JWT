import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "src/dto";
// import { Request } from "express";

@Controller('auth')
export class AuthController 
{
	constructor (private service: AuthService)
	{
	}
	//localhost:3000/auth/signin
	@Post('signin')
	signin(){
		return this.service.signin();
	}

	//(@Req() req: Request) //uses req, res in expressJS to get the body content
			//OR
	//simply use @Body() 
	//dto (Data Transfer Object) is used in order to validate incoming requests
	//any we don't know the incoming data types

	@Post('signup')
	signup(@Body() dto : AuthDto) //AuthDto a object (email,pass) used so you can access to email and pass
	{
		return this.service.signup(dto);
	}
}