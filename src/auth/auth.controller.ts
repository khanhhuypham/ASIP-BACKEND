
import { GoogleAuthService } from './google-auth.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';

@Public()
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private _2FA_AuthService: GoogleAuthService
    ) { }

    @Post('/admin/sign-up')
    signUp(@Body() dto: SignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(dto);
    }

    @UseGuards(AuthGuard('local'))
    @Post('/admin/sign-in')
    signIn(@Body() dto: LoginDto) {
        return this.authService.signIn(dto);
    }

    @Post('/admin/generate-2fa')
    async generateTwoFactorAuthSecret(@Body() body: { user_id: number }) {
        return await this._2FA_AuthService.generateSecret(body.user_id);
    }

    @Post('/admin/verify-otp')
    verify(@Body() body: {
        username: string;
        otp: string;
    }) {
        return this._2FA_AuthService.verifyToken(body.username, body.otp);
    }

}
