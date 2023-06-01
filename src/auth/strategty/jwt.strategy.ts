import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt')//you can leve it blank without 'jwt'
{
    constructor(config: ConfigService, private prisma:PrismaService)
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });//the jwtFrom... and secretOrKey must be the smae that in PassportStrategy class
        
    }
    async validate(payload: {
            sub:number;
            email: string;
        })//if valid return to console
    {
        const user = await this.prisma.user.findUnique({
            where: {
                email : payload.email,//use the attribute that has type Unique
            },
        });
        // console.log({payload,});

        delete user.hashed_PASSWD;
        return payload;//if user found is returned else a null returnd and 401 Unauthorized is set
    }
}