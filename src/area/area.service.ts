import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Repository } from 'typeorm';
import { Area } from './entities/area.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryItemsDTO } from './dto/query-area.dto';

@Injectable()
export class AreaService {
    constructor(
        @InjectRepository(Area)
        private readonly areaRepo: Repository<Area>,
    ) { }

    async create(dto: CreateAreaDto): Promise<Area> {
        const area = await this.areaRepo.create(dto);
        return await this.areaRepo.save(area);
    }

    async findAll(): Promise<Area[]> {
        return await this.areaRepo.find({relations:{
            rooms:true
        }});



    }

    async findOne(id: number): Promise<Area> {
        const area = await this.areaRepo.findOne({ where: { id }, relations: {
            rooms:true
            
        }});
     
        return area
    }

    async update(id: number, dto: UpdateAreaDto): Promise<Area> {
        const area = await this.findOne(id);
        
        if (!area) throw new NotFoundException(`Area with id ${id} not found`);

        area.name = dto.name
        area.description = dto.description
        await this.areaRepo.save(area);

        return area
    }

    async remove(id: number): Promise<void> {
        const area = await this.findOne(id);
        if (!area) throw new NotFoundException(`Area with id ${id} not found`);
        await this.areaRepo.remove(area);
    }
}
