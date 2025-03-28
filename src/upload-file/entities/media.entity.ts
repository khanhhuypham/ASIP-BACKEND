import { Media_Type } from "src/common/constant/enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("media")
export class Media {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    url: string;

    @Column({
        type: 'enum',
        enum: Media_Type,
        default: Media_Type.image
    })
    type: Media_Type;
}