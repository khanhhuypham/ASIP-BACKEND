import { NotFoundException } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, isString, Min } from "class-validator";
import { DEFAULT_CURSOR, DEFAULT_OFFSET } from "../constant/constant";



export class PaginationDto {
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @Min(1)
    page: number = DEFAULT_CURSOR;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    @Min(1)
    limit: number = DEFAULT_OFFSET;


    @IsOptional()
    @IsString()
    search_key: string = "";

    constructor(data: Partial<PaginationDto>) {
        Object.assign(this, data);
    }
}







export class PaginationResult<T> {
    list: T[];
    total_record: number;
    page: number;
    limit: number;

    constructor(data: Partial<PaginationResult<T>>) {
        // Validate and set defaults
        this.list = data.list ?? [];
        this.total_record = data.total_record ?? 0;
        this.page = Math.abs(data.page ?? DEFAULT_CURSOR);
        this.limit = Math.abs(data.limit ?? DEFAULT_OFFSET);
    }

}