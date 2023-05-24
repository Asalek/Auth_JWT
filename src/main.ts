import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

