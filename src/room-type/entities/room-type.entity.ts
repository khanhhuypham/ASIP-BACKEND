import { RoomType_Status } from "src/common/constant/enum";
import { Room } from "src/room/entities/room.entity";
import { ImageDto } from "src/upload-file/dto/image.dto";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("room_type")
export class RoomType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    code: string;

    @Column({ unique: true })
    name: string;

    @Column({ type: "json", nullable: true })
    images:ImageDto[];


    @Column({ type: "text", nullable: true })
    description: string;

    @Column({
        type: 'enum',
        enum: RoomType_Status,
        default: RoomType_Status.ACTIVE
    })
    status: RoomType_Status;

    @Column()
    // @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @OneToMany(() => Room, (room) => room.room_type)
    room: Room[]


    // @BeforeInsert()
    // generateCode() {
    //     // Option 1: UUID (most reliable for uniqueness)
    //     // this.code = uuidv4();

    //     // Option 2:  Prefix + Timestamp + Random (good balance of readability and uniqueness)
    //     this.code = `RT-${Math.floor(Math.random() * 1000)}`;

    // }

}
