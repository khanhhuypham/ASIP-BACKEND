
import { Transform } from "class-transformer";
import { Booking } from "src/booking/entities/booking.entity";
import { DATE_FORMAT } from "src/common/constant/constant";
import { Gender, Guest_Type } from "src/common/constant/enum";
import { convertDateToString } from "src/common/util/time-util";
import { GuestGroup } from "src/guest-group/entities/guest-group.entity";
import { ImageDto } from "src/upload-file/dto/image.dto";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("guest")
export class Guest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    code: string;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true, nullable: true })
    email: string;


    @Column({ type: "json", nullable: true })
    avatar: ImageDto;

    @Column({
        type: 'enum',
        enum: Gender,
        default: Gender.Male // Adjust default as per your enum
    })
    gender: Gender;

    @Column({
        type: 'enum',
        enum: Guest_Type,
        default: Guest_Type.individual // Adjust default as per your enum
    })
    guest_type: Guest_Type;

    @Column({ type: "text" })
    phone: string;


    @Column({ type: 'date' })
    // ✅ Format DOB as "dd/MM/yyyy" when returning the response
    @Transform(({ value }) => {
        if (!value) return null;
        return convertDateToString(value, DATE_FORMAT.DDMMYYY);
    })
    DOB: Date;

    @Column({ type: "text", nullable: true })
    description: string;

    @OneToOne(() => Booking, (booking) => booking.guest) // specify inverse side as a second parameter
    @JoinColumn()
    booking: Booking;


    @ManyToOne(() => GuestGroup, (group) => group.guests, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'guest_group_id' })
    guest_group: GuestGroup;
}
