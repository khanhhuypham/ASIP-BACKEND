import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { RoomType_Status } from "src/common/constant/enum";
import { ImageDto } from "src/upload-file/dto/image.dto";

export class CreateRoomTypeDto {

    @IsString()
    name: string;

    @IsString()
    code: string;

    @IsOptional()
    @IsString()
    description?:string;

    @IsOptional()
    @IsArray()
    @ValidateNested()
    @Type(() => ImageDto)
    images: ImageDto[];


    @IsOptional()
    @IsEnum(RoomType_Status)
    status: RoomType_Status;

    

    @IsNumber()
    @Type(() => Number) // Transforms the incoming value to a number
    @Min(0)
    price: number;
    
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true }) // Validates each element in the array is a number
    @Type(() => Number) // Transforms each element in the array to a number
    roomIds: number[]
}
