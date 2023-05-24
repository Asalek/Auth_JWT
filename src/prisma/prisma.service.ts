import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient   //inheret from Prisma it's methods (connect,desconnect,use,...)
{
	constructor()
	{
		super({	//super access to the mother class (inheret from (PrismaClient))
			datasources: {
				db: {
					url: "postgresql://postgres:123@localhost:5434/nest?schema=public"
				}
			}
		})
	}
}
