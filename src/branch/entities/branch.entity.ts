import { Transform } from "class-transformer";
import { DATE_FORMAT } from "src/common/constant/constant";
import { convertDateToString } from "src/common/util/time-util";
import { Hotel } from "src/hotel/entities/hotel.entity";
import { ImageDto } from "src/upload-file/dto/image.dto";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("branch")
export class Branch {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @Unique("UQ_branch_name", ["name"]) //// define constrainst name from db platform
    name: string;

    @Column({ unique: true, nullable: true })
    @Unique("UQ_branch_email", ["email"]) // define constrainst name from db platform
    email: string;


    @Column({ type: "json", nullable: true })
    image: ImageDto;


    @Column({ type: "text" })
    phone: string;


    @Column({
        type: "boolean",
        default: true, // Optional: set default value
    })
    active: boolean;


    @Column({ type: "text" })
    address: string;

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

    @ManyToOne(() => Hotel, (hotel) => hotel.branches, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'hotel_id' })
    hotel: Hotel;


    @OneToMany(() => User, (user) => user.branch)
    users: User[];

}
