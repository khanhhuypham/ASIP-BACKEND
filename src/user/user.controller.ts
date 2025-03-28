import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() dto: CreateUserDto) {
        const newUser = await this.userService.createUser(dto)
        return newUser;
    }

    @Get()
    findAll():Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOneById(+id);
    }


    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.deleteById(+id);
    }
}
