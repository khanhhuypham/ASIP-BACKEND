import { Room_Status } from 'src/common/constant/enum';
import { Transform } from "class-transformer";
import {  IsBoolean, IsNumber, IsOptional } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";


export class QueryRoomDTO extends PaginationDto{
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    status: Room_Status;


    @IsOptional()
    @Transform(({ value }) => String(value).toLowerCase().trim() === 'true')
    @IsBoolean()
    active: boolean;
}