import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { _2FASecret } from './dto/_2FASecrete';


@Injectable()
export class GoogleAuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async generateSecret(user_id: number) {

        const user = await this.userService.findOneById(user_id)

        if (!user) {
            throw new BadRequestException("user doesn't exists");
        }
        

        const secretObject = speakeasy.generateSecret({
            name: `ASIP-${user.username}`,
        });
       
        // const QR_Code = await qrcode.toDataURL(secret.otpauth_url)
        const QR_Code = secretObject.otpauth_url
        const secret = secretObject.base32; // Store secret
        const twoFASecret = new _2FASecret(QR_Code, secret);
-
        await this.userService.updateUser2FASecret(user.id, twoFASecret)

        return twoFASecret
    }   



    async verifyToken(username: string, otp: string) {
        const user = await this.userService.findOneByUserName(username)

        if (!user) return false;

       
        const isValid = speakeasy.totp.verify({
            secret: user._2FASecret.secret,
            encoding: 'base32',
            token: otp,
            window: 1, // Allow for time drift
        });


        if (!isValid) {
            throw new UnauthorizedException('Invalid otp');
        }

        const token = this.jwtService.sign({ id: user.id });

        return {
            access_token: token,
            user_id:user.id
        };

    }
}
