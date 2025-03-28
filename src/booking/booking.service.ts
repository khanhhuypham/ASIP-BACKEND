import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { Guest } from 'src/guest/entities/guest.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/room/entities/room.entity';
import { GuestService } from 'src/guest/guest.service';

@Injectable()
export class BookingService {


    constructor(
        @InjectRepository(Booking)
        private bookingRepo: Repository<Booking>,
        private guestService: GuestService,
    ){}

    async create(dto: CreateBookingDto) {
        const guest = await this.guestService.findOne(dto.guest_id);
        
        let rooms: Room[] = []
    
        if (!guest){
            throw new NotFoundException(`guest with id ${dto.guest_id} not found`);
        }




        const newBooking = await this.bookingRepo.save({
            name: dto.name,
            description: dto.description,
            status: dto.status,
            checkin: dto.checkin,
            checkout:  dto.checkout,
            adult_quantity: dto.adult_quantity,
            children_quantity: dto.children_quantity,
            room: rooms,
            guest: guest
        });

        return newBooking
    }

    async findAll(): Promise<Booking[]> {
        return await this.bookingRepo.find({
            relations: {
                guest: true,
                room: true
            }
        });
    }

    findOne(id: number) {
        return `This action returns a #${id} booking`;
    }

    update(id: number, dto: UpdateBookingDto) {
        return `This action updates a #${id} booking`;
    }

    remove(id: number) {
        return `This action removes a #${id} booking`;
    }
}
