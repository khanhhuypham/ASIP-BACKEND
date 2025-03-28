import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GuestService } from './guest.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { QueryGuestDTO } from './dto/query-guest.dto';

@Controller('guest')
export class GuestController {
    constructor(private readonly guestService: GuestService) { }

    @Post()
    create(@Body() dto: CreateGuestDto) {
        return this.guestService.create(dto);
    }

    @Get()
    findAll(@Query() query?:QueryGuestDTO) {
        return this.guestService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.guestService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateGuestDto) {
        return this.guestService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.guestService.remove(+id);
    }
}
