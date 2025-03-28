import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Price } from './entities/price.entity';
import { convertDateToString } from 'src/common/util/time-util';
import { DATE_FORMAT } from 'src/common/constant/constant';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PriceService {

    constructor(
        @InjectRepository(Price)
        private priceRepo: Repository<Price>,
    ) { }
    async create(dto: CreatePriceDto) {

        const newPrice = this.priceRepo.create({
            name: dto.name,
            code: dto.code,
            valid_from: dto.valid_from,
            valid_to: dto.valid_to,
            note: dto.note // Ensure 'rooms' matches your entity relationship
        });

        return await this.priceRepo.save(newPrice);
    }

    async findAll(): Promise<Price[]> {
        const priceList = await this.priceRepo.find()

        return plainToClass(Price, priceList, { excludeExtraneousValues: false });
    }

    async findOne(id: number): Promise<Price | null> {
        const price = await this.priceRepo.findOne({
            where: {
                id: id,
            }
        })
        return price;
    }

    async update(id: number, dto: UpdatePriceDto) {

        const existingPrice = await this.findOne(id)

        if (!existingPrice) {
            throw new NotFoundException(`Price with id ${id} not found`);
            // return null; // Or throw an error if you prefer
        }

        // Update the properties of the existing entity with the data from the DTO
        existingPrice.valid_from = dto.valid_from
        existingPrice.valid_to = dto.valid_to
        existingPrice.name = dto.name;
        existingPrice.note = dto.note
        

        const updatePrice = await this.priceRepo.save(existingPrice)
        return plainToClass(Price, updatePrice, { excludeExtraneousValues: false });
 
    }

    async remove(id: number) {
        const price = await this.findOne(id)

        if (!price) {
            throw new NotFoundException(`price with id ${id} not found`);
        }

        await this.priceRepo.remove(price);
    }
}
