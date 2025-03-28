import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';
import { RoomType } from './entities/room-type.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/room/entities/room.entity';

@Injectable()
export class RoomTypeService {

    constructor(
        @InjectRepository(RoomType)
        private roomTypeRepo: Repository<RoomType>,

        @InjectRepository(Room)
        private roomRepo: Repository<Room>,
    ) { }

    async create(dto: CreateRoomTypeDto) {

        let rooms: Room[] = [];

        if (dto.roomIds && dto.roomIds.length > 0) {
            rooms = await this.findAllRoomsByIds(dto.roomIds);
        }
        const newType = this.roomTypeRepo.create({
            name: dto.name,
            code:dto.code,
            description: dto.description,
            images: dto.images,
            status: dto.status,
            price: dto.price,
            room: rooms // Ensure 'rooms' matches your entity relationship
        });

        return await this.roomTypeRepo.save(newType);
    }

    async findAll(): Promise<RoomType[]> {
        const roomTypes = await this.roomTypeRepo.find({
            relations: {
                room: true
            }
        })

        // Use Promise.all to handle multiple asynchronous operations
        // return await Promise.all(roomTypes.map(async (type) => {
    
        //     return type
        // }));

        return roomTypes

    }

    async findOne(id: number): Promise<RoomType | null> {
        const roomType = await this.roomTypeRepo.findOne({
            where: {
                id: id,
            },
            relations: {
                room: true
            }
        })
        return roomType;
    }

    async update(id: number, dto: UpdateRoomTypeDto): Promise<RoomType | null> {
        const existingType = await this.findOne(id)

        if (!existingType) {
            throw new NotFoundException(`RoomType with id ${id} not found`);
            // return null; // Or throw an error if you prefer
        }

        let rooms: Room[] = [];

        if (dto.roomIds && dto.roomIds.length > 0) {
            rooms = await this.findAllRoomsByIds(dto.roomIds);
        }

        // Update the properties of the existing entity with the data from the DTO
        existingType.name = dto.name;
        existingType.description = dto.description
        existingType.images = dto.images
        existingType.price = dto.price
        existingType.status = dto.status
        existingType.room = rooms   

        // Save the updated entity
        await this.roomTypeRepo.save(existingType);

        return existingType; // Return the updated room type
    }

    async remove(id: number): Promise<void> {
        const type = await this.findOne(id)

        if (!type) {
            throw new NotFoundException(`RoomType with id ${id} not found`);
        }

        await this.roomTypeRepo.remove(type);

    }


    async findAllRoomsByIds(ids: number[]): Promise<Room[]> {
        if (!ids || ids.length === 0) {
            return [];
        }

        const rooms = await this.roomRepo.find({
            where: {
                id: In(ids),
            },
        });

        if (rooms.length !== ids.length) {
            const foundIds = rooms.map(room => room.id);
            const missingIds = ids.filter(id => !foundIds.includes(id));
            throw new BadRequestException(`Rooms with IDs [${missingIds.join(', ')}] not found.`);
        }

        return rooms;
    }
}
