import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { _2FASecret } from 'src/auth/dto/_2FASecrete';
import { PaginationResult } from 'src/common/dto/pagination.dto';
import { UserQueryDTO, UserStatistics } from './dto/user-query.dto';
import { plainToClass } from 'class-transformer';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    async findAll(query?: UserQueryDTO): Promise<PaginationResult<User, UserStatistics>> {
        
        // Fetch the users with pagination
        const [users, total] = await this.userRepo
            .createQueryBuilder('user')
            .innerJoin('user.branch', 'branch') // Join the Branch table
            .innerJoin('branch.hotel', 'hotel') // Join the Hotel table
            .where('hotel.id = :hotelId', { hotelId: query.hotel_id }) // Filter by hotel_id
            .andWhere('branch.id = :branchId', { branchId: query.branch_id }) // Filter by branch_id
            .skip((query.page - 1) * query.limit) // Skip records based on page and limit
            .take(query.limit) // Limit the number of records per page
            .getManyAndCount(); // Fetch the users and total count

        // Transform the raw database results to properly apply the @Transform decorators
        const transformedList = plainToClass(User, users, { excludeExtraneousValues: false });

        // Calculate statistics (active vs inactive users)
        const total_active = users.filter((user) => user.active).length;
        const total_inactive = users.filter((user) => !user.active).length;

        // Return paginated results with statistics
        return new PaginationResult<User, UserStatistics>({
            list: transformedList,
            total_record: total,
            page:query.page,
            limit:query.limit,
        }, {
            total,
            total_active,
            total_inactive,
        });
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
