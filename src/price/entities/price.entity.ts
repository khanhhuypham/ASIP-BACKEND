import { Expose, Transform } from "class-transformer";
import { DATE_FORMAT } from "src/common/constant/constant";
import { convertDateToString } from "src/common/util/time-util";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("price")
export class Price {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    code: string;

    @Column({ unique: true })
    name: string;

    @Column({type: 'timestamp'})
    // ✅ Format DOB as "dd/MM/yyyy" when returning the response
    @Transform(({ value }) => {
        if (!value) return null;
        return convertDateToString(value, DATE_FORMAT.DDMMYYY_HHmm);
    })
    valid_from: Date;


    @Column({type: 'timestamp',nullable: true}) // Use 'timestamp', nullable for open-ended
    @Transform(({ value }) => {
        if (!value) return null;
        return convertDateToString(value, DATE_FORMAT.DDMMYYY_HHmm);
    })
    valid_to: Date; // Null means valid indefinitely


    @Column({ nullable: true })
    note: string;

    constructor(data: Partial<Price>) {
        Object.assign(this, data);
    }

}
