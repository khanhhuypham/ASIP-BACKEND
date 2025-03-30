import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { QueryHotelDTO } from './dto/query-hotel-dto';

@Controller('hotel')
export class HotelController {
    constructor(private readonly hotelService: HotelService) { }

    @Post()
    create(@Body() dto: CreateHotelDto) {
        return this.hotelService.create(dto);
    }

    @Get()
    findAll(@Query() query?:QueryHotelDTO) {
        return this.hotelService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.hotelService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateHotelDto) {
        return this.hotelService.update(+id, dto);
    }

    @Get('/:id/change-status')
    changeStatus(@Param('id') id: string) {
        return this.hotelService.changeStatus(+id);
    }

  
}
