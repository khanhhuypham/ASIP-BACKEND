import { Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class UserQueryDTO extends PaginationDto{
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    hotel_id: number;

    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    branch_id: number;

    @IsOptional()
    @Transform(({ value }) => Boolean(value))
    @IsBoolean()
    active: boolean;
}