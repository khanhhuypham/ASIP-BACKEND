import { IsObject, IsString, IsNumber, IsEnum } from 'class-validator';
import { Media_Type } from 'src/common/constant/enum';

export class ImageDto {
    @IsString()
    url: string;

    @IsEnum(Media_Type)
    type: Media_Type;

}