import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { validate } from "class-validator";
import { log } from "console";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt')
{
    constructor(config: ConfigService)
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });//the jwtFrom... and secretOrKey must be the smae that in PassportStrategy class
        
    }
    validate(payload: any)
    {
        console.log({payload,});
        return payload;
    }
}