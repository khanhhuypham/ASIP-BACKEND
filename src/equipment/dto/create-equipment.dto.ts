import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Equipment_condition, Equipment_type } from "src/common/constant/enum";

export class CreateEquipmentDto {

        @IsString()
        name: string;

        @IsOptional()
        @IsString()
        description: string;


        @IsOptional()
        @Transform(({ value }) => parseInt(value, 10))
        @IsEnum(Equipment_type)
        type: Equipment_type; // e.g., "Furniture", "Appliance", "Electronics"


        @IsOptional()
        @Transform(({ value }) => parseInt(value, 10))
        @IsEnum(Equipment_condition) // Validate that gender is one of the enum values
        condition: Equipment_condition; // e.g., "New", "Good", "Needs Repair"

        @IsOptional()
        @IsString()
        // @Transform(({ value }) => {
        //         const date = parse(value, 'dd/MM/yy', new Date());
        //         return format(date, 'yyyy-MM-dd'); // Format the date to YYYY-MM-DD
        // })
        purchaseDate: string;

        @IsOptional()
        @IsNumber()
        room_id: number;
}
