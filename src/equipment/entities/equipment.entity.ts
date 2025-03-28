import { Transform } from 'class-transformer';

import { Equipment_condition, Equipment_type } from 'src/common/constant/enum';
import { Room } from 'src/room/entities/room.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity()
export class Equipment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    name: string;

    @Column({type:"text",nullable:true})
    description: string;

    @Column({
        type: 'enum',
        enum: Equipment_type,
        default: Equipment_type.Furniture // Adjust default as per your enum
    })
    type: Equipment_type; // e.g., "Furniture", "Appliance", "Electronics"

    @Column({
        type: 'enum',
        enum: Equipment_condition,
        default: Equipment_condition.New // Adjust default as per your enum
    })
    condition?: Equipment_condition; // e.g., "New", "Good", "Needs Repair"

    @Column({ type: 'date', nullable: true })
    purchaseDate?: Date;

    @ManyToOne(() => Room, (room) => room.equipments, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'room_id' })
    room?: Room;
}