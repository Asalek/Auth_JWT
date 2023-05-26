import { Injectable } from "@nestjs/common";
import { User, BookMark } from "@prisma/client"; //the User schema
import { AuthDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2'

@Injectable()
export class AuthService
{
	constructor (private prism : PrismaService)
	{}
	async signup(dto : AuthDto)
	{
		//generate the password
		let hashed = await argon.hash(dto.password.toString());
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
		//return the saved user hashed_PASSWD and return it :
		delete user__.hashed_PASSWD;
		return user__;
		// console.log(dto);
	}
	signin()
	{
		return {a:"sign In"}
	}
}
