import { Hotel } from './../../hotel/entities/hotel.entity';
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { ImageDto } from "src/upload-file/dto/image.dto";

export class CreateBranchDto {

    @IsString()
    name: string;


    @ValidateNested()
    @Type(() => ImageDto)
    image: ImageDto;


    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    address: string;

    @IsOptional()
    @Transform(({ value }) => {

        if (value === null || value === undefined) {
            return ""; // Return empty string if null or undefined
        }
        if (typeof value === 'string') {
            return value; // Return the string value as is, even if empty
        }
        return String(value); // Convert other types to string if necessary (though description should be a string)
    })
    @IsString()
    note: string;


    @IsOptional()
    @Transform(({ value }) => {
        // Handle string to boolean transformation
        if (typeof value === 'string') {
            return value.toLowerCase() === 'true' || value === '1';
        }

        return Boolean(value);
    })
    @IsBoolean()
    active: boolean;


    @IsOptional()
    @IsNumber()
    hotel_id: number;

    constructor(partial?: Partial<CreateBranchDto>) {
        Object.assign(this, partial);
    }

}
