import { Transform, Type } from "class-transformer";
import { IsDate, IsEmail, isEmail, IsEnum, IsNumber, isNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { DATE_FORMAT } from "src/common/constant/constant";
import { Gender, Guest_Type } from "src/common/constant/enum";
import { convertDateToString, convertStringToDate } from "src/common/util/time-util";
import { ImageDto } from "src/upload-file/dto/image.dto";

export class CreateGuestDto {

    @IsString()
    code: string;

    @IsString()
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => ImageDto)
    avatar: ImageDto;

    @Transform(({ value }) => parseInt(value, 10))
    @IsEnum(Gender) // Validate that gender is one of the enum values
    gender: Gender;

    @IsString()
    phone: string;


    // ✅ Convert DOB from string to Date when receiving the request
    @Transform(({ value }) => {

        console.log("Huy: ",value)
        if (!value) return new Date();
        const date = convertStringToDate(value, DATE_FORMAT.DDMMYYY);
        return date;
    },{ toClassOnly: true })
    @IsDate({ message: 'Invalid date format. Expected format is DDMMYYY' })
    DOB: Date;


    @Transform(({ value }) => parseInt(value, 10))
    @IsEnum(Guest_Type)
    guest_type: Guest_Type;

    @IsNumber()
    guest_group_id: number;

    @IsOptional()
    @IsString()
    description: string;
}

