import { Transform, Type } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateBranchDto } from "src/branch/dto/create-branch.dto";
import { ImageDto } from "src/upload-file/dto/image.dto";

export class CreateHotelDto {

    @IsString()
    code: string;

    @IsString()
    name: string;

    @IsString()
    owner_name: string;

    @ValidateNested()
    @Type(() => ImageDto)
    image: ImageDto;


    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    phone: string;


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
    @ValidateNested()
    @Type(() => CreateBranchDto)
    branch?: CreateBranchDto;


    constructor(partial?: Partial<CreateHotelDto>) {
        Object.assign(this, partial);
    
    }

}
