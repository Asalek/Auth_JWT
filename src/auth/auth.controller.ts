import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "src/auth/dto";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
// import { Request } from "express";

@Controller('auth')
export class AuthController 
{
	constructor (private service: AuthService)
	{
	}
	
	//localhost:3000/auth/signin
	@HttpCode(HttpStatus.OK)//return 200 on success
	@Post('signin')
	signin(@Body() dto : AuthDto){
		return this.service.signin(dto);
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

	@UseGuards(AuthGuard('jwt'))	// protect the /me route, if jwt strategy is correct allow call validate in JwtStrategy class
	@Get('me')
	getMe(@Req() req:Request)
	{
		// return req.user['id']; return only id
		return req.user['id'];
	}

	@Patch()
	editUser()
	{}
}