import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { IsNull } from "typeorm";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter correct email' })
    username: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

}