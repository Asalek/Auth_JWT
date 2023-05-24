import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService
{
	signup()
	{
		return "sign up";
	}
	signin()
	{
		return {a:"sign In"}
	}
}
