import { PaginationDto } from "src/common/dto/pagination.dto";

export class QueryHotelDTO extends PaginationDto{
    // @IsOptional()
    // @Transform(({ value }) => Number(value))
    // @IsNumber()
    // go: number;
}


export interface HotelStatistics {
    total: number;
    total_active: number;
    total_inactive: number;
}
  