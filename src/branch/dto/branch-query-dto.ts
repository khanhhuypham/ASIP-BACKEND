import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class QueryBranchDTO {
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    hotel_id: number;

    @IsOptional()
    @IsString()
    search_key: string;
}