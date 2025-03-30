import { Transform } from "class-transformer";
import { Branch } from "src/branch/entities/branch.entity";
import { DATE_FORMAT } from "src/common/constant/constant";
import { convertDateToString } from "src/common/util/time-util";
import { ImageDto } from "src/upload-file/dto/image.dto";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("hotel")
export class Hotel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    code: string;

    @Column({ unique: true })
    name: string;

    @Column()
    owner_name: string;

    @Column({ type: "json", nullable: true })
    image: ImageDto;

    @Column({ unique: true, nullable: true })
    email: string;

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
