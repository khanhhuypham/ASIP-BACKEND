import { Booking_Status } from "src/common/constant/enum";
import { Equipment } from "src/equipment/entities/equipment.entity";
import { Guest } from "src/guest/entities/guest.entity";
import { Room } from "src/room/entities/room.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("booking")
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;


    @Column({
        type: 'enum',
        enum: Booking_Status,
        default: Booking_Status.On_Hold
    })
    status: Booking_Status;

    
    @Column({ type: 'date'})
    checkin: Date;

    @Column({ type: 'date'})
    checkout: Date;

    @Column({ type: 'int'})
    adult_quantity: number;

    @Column({ type: 'int'})
    children_quantity: number;

    @OneToMany(() => Room, (room) => room.booking)
    room: Room[];

    @OneToOne(() => Guest,(guest) => guest.booking)
    guest: Guest;
}
