import { IsString, IsOptional, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';
import { convertStringToDate } from 'src/common/util/time-util';
import { DATE_FORMAT } from 'src/common/constant/constant';



export class CreatePriceDto {
    @IsString()
    name: string;

    @IsString()
    code: string;

    // ✅ Convert DOB from string to Date when receiving the request
    @Transform(({ value }) => {
        if (!value) return new Date();
        const date = convertStringToDate(value, DATE_FORMAT.DDMMYYY_HHmm);
        return date;
    }, { toClassOnly: true })
    @IsDate({ message: 'Invalid date format. Expected format is DDMMYYY' })
    valid_from: Date;

    @IsOptional()
    @Transform(({ value }) => {
        if (!value) return new Date();
        const date = convertStringToDate(value, DATE_FORMAT.DDMMYYY_HHmm);
        return date;
    }, { toClassOnly: true })
    @IsDate({ message: 'Invalid date format. Expected format is DDMMYYY' })
    valid_to: Date;

    @IsOptional()
    @Transform(({ value }) => {
        if (value === null || value === undefined) {
            return ''; // Return empty string if null or undefined
        }
        if (typeof value === 'string') {
            return value; // Return the string value as is, even if empty
        }
        return String(value); // Convert other types to string if necessary
    })
    @IsString()
    note: string;
}