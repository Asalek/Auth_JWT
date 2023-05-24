import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()//let you use PrismaModule without import it every time in other modules
@Module({
  providers: [PrismaService],
  exports: [PrismaService],  //to use a service outsid it's file module
})
export class PrismaModule {}
