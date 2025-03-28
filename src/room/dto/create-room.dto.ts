import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Room_Cleanliness, Room_Status } from "src/common/constant/enum";
import { ImageDto } from "src/upload-file/dto/image.dto";


export class CreateRoomDto {
    
    @IsString()
    name: string;


    @IsArray()
    @ValidateNested()
    @Type(() => ImageDto)
    images: ImageDto[];


    @IsNumber()     
    total_guests: number;

    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsEnum(Room_Status) // Validate that gender is one of the enum values
    status: Room_Status = Room_Status.Available;

    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsEnum(Room_Cleanliness) // Validate that gender is one of the enum values
    cleanliness: Room_Cleanliness = Room_Cleanliness.Cleaned;

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

    @IsNumber()
    room_type_id: number;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    equipment_id: number[];

  
    @IsNumber()
    area_id: number;

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
    description: string;

}

  
