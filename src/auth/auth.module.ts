import { ConfigModule } from "@nestjs/config";
import { Controller, Global, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller"
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategty";

@Module({
	imports:[
		ConfigModule.forRoot({isGlobal: true}) , //to load .env file it need for Root permission and become global to be available in prismaModule and others
		PrismaModule,
		JwtModule.register({})//to sign tokens
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy]
})
export class AuthModule{}