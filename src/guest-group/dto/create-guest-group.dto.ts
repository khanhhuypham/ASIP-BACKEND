import { IsOptional, IsString } from "class-validator";

export class CreateGuestGroupDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;
}
