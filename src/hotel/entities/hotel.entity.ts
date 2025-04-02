import { Transform } from "class-transformer";
import { Branch } from "src/branch/entities/branch.entity";
import { DATE_FORMAT } from "src/common/constant/constant";
import { convertDateToString } from "src/common/util/time-util";
import { ImageDto } from "src/upload-file/dto/image.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("hotel")
export class Hotel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @Unique("UQ_hotel_code", ["code"])
    code: string;

    @Column({ unique: true })
    @Unique("UQ_hotel_name", ["name"])
    name: string;

    @Column({ unique: true, nullable: true })
    @Unique("UQ_hotel_email", ["email"])
    email: string;

    @Column()
    owner_name: string;

    @Column({ type: "json", nullable: true })
    image: ImageDto;



    @Column({
        type: "boolean",
        default: true, // Optional: set default value
    })
    active: boolean;

    @Column({ type: "text" })
    phone: string;


    // @Column({ type: "text" })
    // address: string;

    @Column({ type: "text", nullable: true })
    note: string;


    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    @Transform(({ value }) => {
        if (!value) return null;
        return convertDateToString(value, DATE_FORMAT.DDMMYYY_HHmm);
    })
    created_at: Date;


    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    @Transform(({ value }) => {
        if (!value) return null;
        return convertDateToString(value, DATE_FORMAT.DDMMYYY_HHmm);
    })
    updated_at: Date;

    @OneToMany(() => Branch, (branch) => branch.hotel)
    branches: Branch[];

}
