import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { UserQueryDTO, UserStatistics } from './dto/user-query.dto';
import { PaginationResult } from 'src/common/dto/pagination.dto';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() dto: CreateUserDto) {
        const newUser = await this.userService.createUser(dto)
        return newUser;
    }

    @Get()
    findAll(@Query() query?: UserQueryDTO): Promise<PaginationResult<User, UserStatistics>> {
        return this.userService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOneById(+id);
    }


    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        // return this.userService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.deleteById(+id);
    }
}
