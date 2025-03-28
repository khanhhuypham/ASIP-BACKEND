import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GuestGroupService } from './guest-group.service';
import { CreateGuestGroupDto } from './dto/create-guest-group.dto';
import { UpdateGuestGroupDto } from './dto/update-guest-group.dto';

@Controller('guest-group')
export class GuestGroupController {
    constructor(private readonly guestGroupService: GuestGroupService) { }

    @Post()
    create(@Body() createGuestGroupDto: CreateGuestGroupDto) {
        return this.guestGroupService.create(createGuestGroupDto);
    }

    @Get()
    findAll() {
        return this.guestGroupService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.guestGroupService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGuestGroupDto: UpdateGuestGroupDto) {
        return this.guestGroupService.update(+id, updateGuestGroupDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.guestGroupService.remove(+id);
    }
}
