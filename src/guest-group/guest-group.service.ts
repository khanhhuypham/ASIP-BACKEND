import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuestGroupDto } from './dto/create-guest-group.dto';
import { UpdateGuestGroupDto } from './dto/update-guest-group.dto';
import { GuestGroup } from './entities/guest-group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GuestGroupService {

    constructor(
        @InjectRepository(GuestGroup)
        private guestGroupRepo: Repository<GuestGroup>,
    ) { }

    async create(dto: CreateGuestGroupDto): Promise<GuestGroup> {

        return await this.guestGroupRepo.save({
            name: dto.name,
            description: dto.description,
        });

    }

    async findAll(): Promise<GuestGroup[]> {
        return await this.guestGroupRepo.find({
            relations: {
                guests:true
            }
        })
    }

    async findOne(id: number): Promise<GuestGroup> {
        const roomType = await this.guestGroupRepo.findOne({
            where: {
                id: id,
            }
        })
        return roomType;
    }

    async update(id: number, dto: UpdateGuestGroupDto) {
        const existingGroup = await this.findOne(id)

        if (!existingGroup) {
            throw new NotFoundException(`guest group with id ${id} not found`);
            // return null; // Or throw an error if you prefer
        }

        // Update the properties of the existing entity with the data from the DTO
        existingGroup.name = dto.name;
     
        if (dto.description) {
            existingGroup.description = dto.description;
        }

        return await this.guestGroupRepo.save(existingGroup); // Return the updated room typ
    }

    async remove(id: number): Promise<void> {
        const group = await this.findOne(id)

        if (!group) {
            throw new NotFoundException(`guest group with id ${id} not found`);
        }

        await this.guestGroupRepo.remove(group)
    }


}
