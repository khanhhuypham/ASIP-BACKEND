import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { QueryRoomDTO } from './dto/query-item.dto';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) { }

    @Post()
    create(@Body() dto: CreateRoomDto) {
        return this.roomService.create(dto);
    }

    @Get()
    findAll(@Query() query?:QueryRoomDTO) {
        return this.roomService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.roomService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateRoomDto) {
        return this.roomService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.roomService.remove(+id);
    }
}
