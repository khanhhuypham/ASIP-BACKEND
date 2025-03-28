import { IsOptional, IsString } from "class-validator";

export class CreateAreaDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

}
