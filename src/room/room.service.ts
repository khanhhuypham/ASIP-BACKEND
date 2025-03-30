import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { Repository, Transaction } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomTypeService } from 'src/room-type/room-type.service';
import { EquipmentService } from 'src/equipment/equipment.service';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { AreaService } from 'src/area/area.service';
import { QueryRoomDTO } from './dto/query-item.dto';
import { PaginationResult } from 'src/common/dto/pagination.dto';

@Injectable()
export class RoomService {

    constructor(
        @InjectRepository(Room)
        private roomRepo: Repository<Room>,
        private roomTypeService: RoomTypeService,
        private equipService: EquipmentService,
        private areaService: AreaService
    ) { }

    async create(dto: CreateRoomDto): Promise<Room> {
        const roomType = await this.roomTypeService.findOne(dto.room_type_id);
        let equipments: Equipment[] = []
        const area = await this.areaService.findOne(dto.area_id);

     
        if (!roomType) {
            throw new NotFoundException(`Room_Type with id ${dto.room_type_id} not found`);
        }

        if (!area) {
            throw new NotFoundException(`area with id ${dto.area_id} not found`);
        }

        if (dto.equipment_id) {
            equipments = await this.equipService.findAll(dto.equipment_id)
        }

        

        const newRoom = await this.roomRepo.save({
            name: dto.name,
            description: dto.description,
            images: dto.images,
            total_guests: dto.total_guests,
            status: dto.status,
            room_type:roomType,
            equipments: equipments,
            area: area
        });

        return newRoom
    }

    async findAll(query?: QueryRoomDTO): Promise<PaginationResult<Room>> {
        // const total = await this.roomRepo.find({
        //     where: {
        //         status: query.status
        //     }
        // })
        // const list = await this.roomRepo.find({
        //     where: {
        //         status: query.status
        //     },
        //     relations: {
        //         equipments: true,
        //         roomType: true,
        //         area: true
        //     },
        //     skip: (query.page - 1) * query.limit,
        //     take: query.limit
        // })


        const [list, total] = await this.roomRepo.findAndCount({
            where: { 
                status:query.status,
                active:query.active
            },
            relations: {
                equipments: true,
                room_type: true,
                area: true,
            },
            skip: (query.page - 1) * query.limit,
            take: query.limit
        });


        return new PaginationResult<Room>({
            list,
            total_record: total,
            page: query.page,
            limit: query.limit,
        })

    }

    async findOne(id: number): Promise<Room> {
        const room = await this.roomRepo.findOne({
            where: {
                id: id,
            },
            relations: {
                equipments: true,
                room_type: true,
                area: true
            }
        })


        return room;
    }

    async update(id: number, dto: UpdateRoomDto): Promise<Room> {
        const existingRoom = await this.findOne(id);
        const roomType = await this.roomTypeService.findOne(dto.room_type_id);
        const area = await this.areaService.findOne(dto.area_id);


        if (!existingRoom) {
            throw new NotFoundException(`Room with id ${id} not found`);
        }

        if (!roomType) {
            throw new NotFoundException(`RoomType with id ${dto.room_type_id} not found`);
        }

        if (!area) {
            throw new NotFoundException(`area with id ${dto.area_id} not found`);
        }

        existingRoom.name = dto.name
        existingRoom.images = dto.images
        existingRoom.total_guests = dto.total_guests
        existingRoom.room_type = roomType
        existingRoom.area = area


        if (dto.status) {
            existingRoom.status = dto.status
        }

        if (dto.equipment_id) {
            existingRoom.equipments = await this.equipService.findAll(dto.equipment_id)
        }

        if (dto.description) {
            existingRoom.description = dto.description
        }

        // Save the updated entity
        return await this.roomRepo.save(existingRoom);
    }

    async remove(id: number): Promise<void> {
        const room = await this.findOne(id)
        if (!room) {
            throw new NotFoundException(`room with id ${id} not found`);
        }

        await this.roomRepo.remove(room);
    }
}
