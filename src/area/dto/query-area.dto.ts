import { Query } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {  IsNumber, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';


export class QueryItemsDTO extends PaginationDto{
    // @IsOptional()
    // @Transform(({ value }) => Number(value))
    // @IsNumber()
    // category_id: number;
}