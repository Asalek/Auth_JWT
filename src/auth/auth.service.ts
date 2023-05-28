import { ForbiddenException, Injectable } from "@nestjs/common";
import { User, BookMark } from "@prisma/client"; //the User schema
import { AuthDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2'
import { isInstance } from "class-validator";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable()
export class AuthService
{
	constructor (private prism : PrismaService)
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
			//  *2 				or simply delete the user 
			delete user__.hashed_PASSWD;
			//return the saved user hashed_PASSWD and return it :
			return user__;
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
		delete user_to_find.hashed_PASSWD;
		return user_to_find;
	}
}
