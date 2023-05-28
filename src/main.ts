import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ // to use class validator globaly every where
		whitelist: true, //get only the values that are in the AuthDto not id, time, ...
		//try to comment it and send id field
	}
  ));
  await app.listen(3000);
}
bootstrap();

//create module :
	//nest g module user
	//nest g service user --no-spec   //no test file

//prisma
	//npm i -D prisma@latest
	// npm i @prisma/client
	//npx prisma init		//init prisma .env and schema
	//npx prisma --help
	//npx prisma migrate dev	//generate mysql and schemas
	//npx prisma studio			// see database collections
	//npx prisma format			//declare a model object to use relations

//Class validator
	//npm i class-validator class-transformer

//Argon Hash
	//npm i argon2

//config module
	//npm i @nestjs/config

//passports
	//npm i @nestjs/passport passport
	//npm i @nestjs/jwt passport-jwt
	//npm i --save-dev @types/passport-jwt		///save it as development dependencies
