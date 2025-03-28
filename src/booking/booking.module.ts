import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking } from './entities/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestModule } from 'src/guest/guest.module';

@Module({
    imports: [TypeOrmModule.forFeature([Booking]),GuestModule],
    controllers: [BookingController],
    providers: [BookingService],
})
export class BookingModule { }
