import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { _2FASecret } from 'src/auth/dto/_2FASecrete';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        const users = this.userRepo.find().then((list) => Promise.all(list.map(
            async (user) => {
                delete user.password
                return user
            })
        ));

        return users;
    }

    async findOneById(id: number): Promise<User | null> {
        const user = await this.userRepo.findOne({
            where: {
                id: id,
            },
        }).then(async (user) => {
            delete user.password
            return user
        })
        return user;
    }

    async findOneByUserName(username: string): Promise<User | null> {
        const user = await this.userRepo.findOne({
            where: {
                username: username,
            },
        });

        return user;

    }


    async createUser(dto: CreateUserDto) {
        const newUser = await this.userRepo.create(dto);

        await this.userRepo.save({
            name: dto.name,
            username: dto.username,
            email: dto.email,
            password: dto.password
        });
        return newUser;
    }

    async updateUser2FASecret(userId: number, _2FASecret: _2FASecret) {
        const existingUser = await this.findOneById(userId)

        if (!existingUser) {
            throw new NotFoundException(`user with id ${userId} not found`);
            // return null; // Or throw an error if you prefer
        }


        existingUser._2FASecret = _2FASecret
        await this.userRepo.save(existingUser);


    }

    async deleteById(id: number) {
        const user = await this.userRepo.findOne({
            where: {
                id: id,
            },
        });
        if (!user) {
            return null;
        }

        await this.userRepo.remove(user);
        return user;
    }
}
