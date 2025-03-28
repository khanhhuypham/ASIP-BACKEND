import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload) {
        const { id } = payload;

        const user = await this.userRepo.findOne({
            where: {
                id: id,
            },
        });


        if (!user) {
            throw new UnauthorizedException('Login first to access this endpoint.');
        }

        return user;
    }
}