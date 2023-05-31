import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "src/auth/dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthService
{
	constructor (private prism : PrismaService,
		private jwt: JwtService,
		private config : ConfigService
		)
	{}

	async signup(dto : AuthDto)
	{
		//generate the password
		let hashed = await argon.hash(dto.password.toString());
		try
		{
			//save the new user in the database
			let user__ = await this.prism.user.create({
				data: {
					email: dto.email.toString(),
					hashed_PASSWD: hashed
				},
				// select:{	//select the data to e shown/returned     *1
				// 	id: true,
				// 	email: true,
				// 	createdAt: true,
				// 	fname: true,
				// 	lname: true
				// }
			});
			//  *2 				or simply delete the user password
			// delete user__.hashed_PASSWD;
			//return the saved user hashed_PASSWD and return it :
			
			return this.signToken(user__.id, user__.email);
		}
		catch (error)
		{
			if (error instanceof PrismaClientKnownRequestError)
				if (error.code === "P2002")// this error code of duplicated fieled (already used)
					throw new ForbiddenException('email already in use');
			throw new ForbiddenException('unkonwn error');
			// throw error;
		}
	}

	async signin(dto : AuthDto)
	{
		//find the user by email
		let user_to_find = await this.prism.user.findUnique({
			where:{
				email: dto.email.toString(),
			}
		});
		//if user doesn't exist throw exception
		if (!user_to_find)
			throw new ForbiddenException('no such user',);
		//compare password
		let pwMatch = await argon.verify(
			user_to_find.hashed_PASSWD,
			dto.password.toString(),
		);
		//if password incorrect throw error
		if (!pwMatch)
			throw new ForbiddenException('Password incorrect');
		//send back the user	
		return this.signToken(user_to_find.id, user_to_find.email);
	}

	//wthy we returned a string cz JWT return a string token || or return an objectt
	async signToken(userId:number, email:string): Promise<{token:string}> //the return typr is string
	{
		let payload = {
			id: userId,
			email //similar to this.email=email
		};
		const secret:string = this.config.get("JWT_SECRET");

		const access_token:string = await this.jwt.signAsync(payload,{
			expiresIn: "15m", //in 15 minute the token will expired and user must sign in again
			secret: secret
		});
		return {token: access_token,}
	}
}
