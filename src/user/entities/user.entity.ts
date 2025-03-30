import { Exclude } from "class-transformer";
import { _2FASecret } from "src/auth/dto/_2FASecrete";
import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;


    @Column('json', { nullable: true })  // Marked as nullable, meaning _2FASecret can be null.
    _2FASecret: _2FASecret; // Marked as nullable, meaning _2FASecret can be null.
}
