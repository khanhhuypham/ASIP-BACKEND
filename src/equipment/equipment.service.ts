import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './entities/equipment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { convertStringToDate } from 'src/common/util/time-util';
import { Room } from 'src/room/entities/room.entity';
import { DATE_FORMAT } from 'src/common/constant/constant';

@Injectable()
export class EquipmentService {

    constructor(
        @InjectRepository(Equipment)
        private equipRepo: Repository<Equipment>,

        @InjectRepository(Room)
        private roomRepo: Repository<Room>
    ) { }

    async create(dto: CreateEquipmentDto): Promise<Equipment> {


        let room: Room | undefined = undefined
        if (dto.room_id) {
            room = await this.findRoomById(dto.room_id)

            if (!room) {
                throw new NotFoundException(`room with id ${dto.room_id} not found`);
            }

        }


        return await this.equipRepo.save({
            name: dto.name,
            description: dto.description,
            type: dto.type,
            condition: dto.condition,
            purchaseDate: convertStringToDate(dto.purchaseDate,DATE_FORMAT.DDMMYYY),
            room: room
        });

    }

    async findAll(ids?: number[]): Promise<Equipment[]> {

        if (ids) {
          
            return await this.equipRepo.find({
                where: {
                    id: In(ids)
                }
            });

        } else {
            return await this.equipRepo.find()

        }

    }


    async findOne(id: number): Promise<Equipment | null> {
        const equip = await this.equipRepo.findOne({
            where: {
                id: id,
            }
        })
        return equip;
    }

    async update(id: number, dto: UpdateEquipmentDto): Promise<Equipment> {
        const existingEquip = await this.findOne(id)

        let room: Room | undefined = undefined

        if (dto.room_id) {
            room = await this.findRoomById(dto.room_id)

            if (!room) {
                throw new NotFoundException(`room with id ${dto.room_id} not found`);
            }

        }
        if (!existingEquip) {
            throw new NotFoundException(`equip with id ${id} not found`);
        }



        // Update the properties of the existing entity with the data from the DTO
        existingEquip.name = dto.name;

        if (dto.description) {
            existingEquip.description = dto.description
        }

        if (dto.type) {
            existingEquip.type = dto.type;
        }


        if (dto.condition) {
            existingEquip.condition = dto.condition;
        }

        if (dto.purchaseDate) {
            existingEquip.purchaseDate = convertStringToDate(dto.purchaseDate,DATE_FORMAT.DDMMYYY);
        }

        if (room) {
            existingEquip.room = room;
        }


        // Save the updated entity
        await this.equipRepo.save(existingEquip);

        return existingEquip; // Return the updated room type
    }

    async remove(id: number): Promise<void> {
        const equipment = await this.findOne(id)

        if (!equipment) {
            throw new NotFoundException(`equipment with id ${id} not found`);
        }


        await this.equipRepo.remove(equipment);
    }

    async findRoomById(id: number): Promise<Room> {
        const room = await this.roomRepo.findOne({
            where: {
                id: id,
            },
        })
        return room;
    }
}
