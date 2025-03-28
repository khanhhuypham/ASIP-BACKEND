import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Booking_Status } from "src/common/constant/enum";

export class CreateBookingDto {
    @IsString()
    name: string;

    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsEnum(Booking_Status) // Validate that gender is one of the enum values
    status: Booking_Status;

    @IsString()
    checkin: string;

    @IsString()
    checkout: string;

    @IsNumber()
    adult_quantity: number;
    
    @IsNumber()
    children_quantity: number;
    
    @IsNumber()
    room_ids: number[];
    
    @IsNumber()
    guest_id: number;

    @IsOptional()
    @IsString()
    description: string;
}
