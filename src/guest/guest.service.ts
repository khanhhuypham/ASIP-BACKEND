import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Guest } from './entities/guest.entity';
import { Repository } from 'typeorm';
import { promises } from 'dns';
import { GuestGroupService } from 'src/guest-group/guest-group.service';
import { QueryGuestDTO } from './dto/query-guest.dto';
import { PaginationResult } from 'src/common/dto/pagination.dto';
import { plainToClass, plainToInstance } from 'class-transformer';

@Injectable()
export class GuestService {

    constructor(
        @InjectRepository(Guest)
        private guestRepo: Repository<Guest>,
        private guestGroupService: GuestGroupService
    ) { }

    async create(dto: CreateGuestDto): Promise<Guest> {

        const group = await this.guestGroupService.findOne(dto.guest_group_id);

        if (!group) {
            throw new NotFoundException(`guest group with id ${dto.guest_group_id} not found`);
        }


        const guest = await this.guestRepo.save({
            code: dto.code,
            name: dto.name,
            avatar: dto.avatar,
            email: dto.email,
            gender: dto.gender,
            phone: dto.phone,
            DOB: dto.DOB,
            guest_type: dto.guest_type,
            description: dto.description,
            guest_group: group
        });

        return  plainToClass(Guest, guest, { excludeExtraneousValues: false });


    }

    async findAll(query?: QueryGuestDTO): Promise<PaginationResult<Guest>> {

        const [list, total] = await this.guestRepo.findAndCount({
            relations: {
                guest_group: true
            },
            skip: (query.page - 1) * query.limit,
            take: query.limit
        });

        // Transform the raw database results to properly apply the @Transform decorators
        const transformedList = plainToClass(Guest, list, { excludeExtraneousValues: false });



        return new PaginationResult<Guest>({
            list: transformedList,
            total_record: total,
            page: query.page,
            limit: query.limit,
        })

    }

    async findOne(id: number): Promise<Guest | null> {
        const roomType = await this.guestRepo.findOne({
            where: {
                id: id,
            }
        })
        return roomType;
    }

    async update(id: number, dto: UpdateGuestDto): Promise<Guest> {
        const existingGuest = await this.findOne(id)
        const group = await this.guestGroupService.findOne(dto.guest_group_id);


        if (!existingGuest) {
            throw new NotFoundException(`guest with id ${id} not found`);
            // return null; // Or throw an error if you prefer
        }

        if (!group) {
            throw new NotFoundException(`guest group with id ${dto.guest_group_id} not found`);
        }



        if (dto.avatar) {
            existingGuest.avatar = dto.avatar;
        }

        if (dto.email) {
            existingGuest.email = dto.email;
        }

        // Update the properties of the existing entity with the data from the DTO
        existingGuest.name = dto.name;
        existingGuest.DOB = dto.DOB;
        existingGuest.guest_group = group;
        existingGuest.guest_type = dto.guest_type;
        existingGuest.gender = dto.gender;
        existingGuest.phone = dto.phone;
        existingGuest.description = dto.description;

        await this.guestRepo.save(existingGuest); // Return the updated room type

        // Transform the raw database results to properly apply the @Transform decorators
        return  plainToClass(Guest, existingGuest, { excludeExtraneousValues: false });
    }

    async remove(id: number): Promise<void> {
        const guest = await this.findOne(id)

        if (!guest) {
            throw new NotFoundException(`guest with id ${id} not found`);
        }

        await this.guestRepo.remove(guest)
    }

}
