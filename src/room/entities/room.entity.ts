
import { Area } from "src/area/entities/area.entity";
import { Booking } from "src/booking/entities/booking.entity";
import { Room_Cleanliness, Room_Status } from "src/common/constant/enum";
import { Equipment } from "src/equipment/entities/equipment.entity";
import { RoomType } from "src/room-type/entities/room-type.entity";
import { ImageDto } from "src/upload-file/dto/image.dto";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("room")
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: "json"})
    images:ImageDto[];

    @Column({ type: 'int' })
    total_guests: number;

    @Column({
        type: 'enum',
        enum: Room_Status,
        default: Room_Status.Available // Adjust default as per your enum
    })
    status: Room_Status;

    @Column({
        type: 'enum',
        enum: Room_Cleanliness,
        default: Room_Cleanliness.Cleaned // Adjust default as per your enum
    })
    cleanliness: Room_Cleanliness;


    @Column({
        type: "boolean",
        default: true, // Optional: set default value
    })
    active: boolean;

    @ManyToOne(() => RoomType, (type) => type.room,{eager:true})
    room_type: RoomType

    @OneToMany(() => Equipment, (equip) => equip.room)
    equipments: Equipment[];

    @ManyToOne(() => Area, area => area.rooms, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'area_id' })
    area: Area;

    @ManyToOne(() => Booking, (b) => b.room)
    @JoinColumn({ name: 'booking_id' })
    booking: Booking;

}
