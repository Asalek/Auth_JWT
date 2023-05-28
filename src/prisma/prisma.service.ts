import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable() //to use depencies such as configService
export class PrismaService extends PrismaClient   //inheret from Prisma it's methods (connect,desconnect,use,...)
{
	constructor(config: ConfigService)
	{
		super({	//super access to the mother class (inheret from (PrismaClient))
			datasources: {
				db: {
					// url: "postgresql://postgres:123@localhost:5434/nest?schema=public"
					url: config.get('DATABASE_URL'),//this the same as above but more secure
				}
			}
		});
	}
}
