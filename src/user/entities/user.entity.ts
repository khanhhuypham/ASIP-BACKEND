import { Exclude } from "class-transformer";
import { _2FASecret } from "src/auth/dto/_2FASecrete";
import { Branch } from "src/branch/entities/branch.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Unique("UQ_user_name", ["name"])
    name: string;

    @Column({ unique: true })
    @Unique("UQ_user_code", ["code"])
    code: string;

    @Column({ unique: true })
    @Unique("UQ_user_username",["username"])
    username: string;

    @Column({ unique: true })
    @Unique("UQ_user_email",["email"])
    email: string;

    @Column()
    phone: string;

    @Column({
        type: "boolean",
        default: true, // Optional: set default value
    })
    active: boolean;

    @Exclude() // Exclude from API response
    @Column()
    password: string;

    @Exclude()  // Exclude from API response
    @Column('json', { nullable: true })  // Marked as nullable, meaning _2FASecret can be null.
    _2FASecret: _2FASecret; // Marked as nullable, meaning _2FASecret can be null.


    @ManyToOne(() => Branch, (branch) => branch.users, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'branch_id' })
    branch: Branch;

}
