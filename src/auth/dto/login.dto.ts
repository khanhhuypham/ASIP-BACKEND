import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter correct email' })
    username: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
    
}