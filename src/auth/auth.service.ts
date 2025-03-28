import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';
import { SignUpDto } from './dto/signup.dto';
import { UserService } from 'src/user/user.service';
import { GoogleAuthService } from './google-auth.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private _2FA_AuthService: GoogleAuthService
    ) { }

    async signUp(dto: SignUpDto): Promise<{ token: string }> {
        const existingUser = await this.userService.findOneByUserName(dto.username);

        if (existingUser) {
            throw new BadRequestException('email already exists');
        }

    
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.userService.createUser({
            username:dto.username,
            name:dto.name,
            email:dto.email,
            password: hashedPassword
        })


        const token = this.jwtService.sign({ id: user.id });


        return { token };
    }

    async login(dto: LoginDto){
        const { username, password } = dto;


        const user = await this.userService.findOneByUserName(username);

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const { secret, QR_Code } = await this._2FA_AuthService.generateSecret(user);

        return {
            secret: secret,    
            QR_Code:QR_Code
        };
    }


    async validateUser(username: string, password: string): Promise<User> {
        const user: User = await this.userService.findOneByUserName(username);
        if (!user) {
            throw new BadRequestException('User not found');
        }
        const isMatch: boolean = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            throw new BadRequestException('Password does not match');
        }
        return user;
    }



}
