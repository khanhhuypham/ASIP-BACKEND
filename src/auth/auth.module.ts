import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategy/jwt.strategy';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { GoogleAuthService } from './google-auth.service';



@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRES },
        }), // Your AuthModule should import the JwtModule to handle JSON Web Token (JWT) generation and verification.
        TypeOrmModule.forFeature([User]),

    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy,JwtStrategy,GoogleStrategy,GoogleAuthService],
    exports: [JwtStrategy, AuthService],
})
export class AuthModule { }
