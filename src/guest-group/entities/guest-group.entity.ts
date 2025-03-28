import { Guest } from "src/guest/entities/guest.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("guest_group")
export class GuestGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;


    @Column({ type: "text", nullable: true })
    description: string;


    @OneToMany(() => Guest, (guest) => guest.guest_group)
    guests: Guest[];

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

}
