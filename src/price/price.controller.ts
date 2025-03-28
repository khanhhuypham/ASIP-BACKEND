import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PriceService } from './price.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Controller('price')
export class PriceController {
    constructor(private readonly priceService: PriceService) { }

    @Post()
    create(@Body() dto: CreatePriceDto) {
     
        return this.priceService.create(dto);
    }

    @Get()
    findAll() {
        return this.priceService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.priceService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdatePriceDto) {
        return this.priceService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.priceService.remove(+id);
    }
}
