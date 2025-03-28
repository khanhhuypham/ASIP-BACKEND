
import { Room } from "src/room/entities/room.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Area {
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  

    @Column()
    description: string;

    @OneToMany(() => Room, room => room.area)
    rooms: Room[];
}
