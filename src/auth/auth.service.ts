import { Injectable } from "@nestjs/common";
import { User, BookMark } from "@prisma/client"; //the User schema
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService
{
	constructor (private prism : PrismaService)
	{}
	signup()
	{
		return "sign up";
	}
	signin()
	{
		return {a:"sign In"}
	}
}
