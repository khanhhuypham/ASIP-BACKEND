import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class GoogleAuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async generateSecret(user: User) {

        const secret = speakeasy.generateSecret({
            name: `ASIP-${user.email}`,
        });

        const QR_Code = await qrcode.toDataURL(secret.otpauth_url)
        const _2FASecret = secret.base32; // Store secret

        await this.userService.updateUser2FASecret(user.id, _2FASecret)

        return {
            secret: _2FASecret,
            QR_Code: QR_Code
        };
    }



    async verifyToken(username: string, otp: string) {
        const user = await this.userService.findOneByUserName(username)

        if (!user) return false;


        const isValid = speakeasy.totp.verify({
            secret: user._2FASecret,
            encoding: 'base32',
            token: otp,
            window: 1, // Allow for time drift
        });


        if (!isValid) {
            throw new UnauthorizedException('Invalid otp');
        }

        const token = this.jwtService.sign({ id: user.id });


        return {
            data: {
                access_token: token,
                user_id:user.id
            }
        };

    }
}
