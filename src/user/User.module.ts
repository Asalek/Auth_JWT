import { Controller, Module } from "@nestjs/common";
import { UserService } from "./User.service";


@Module({
	imports:[],
	providers: [UserService]
})
export class UserModule{}