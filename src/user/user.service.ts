import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Brackets, QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { _2FASecret } from 'src/auth/dto/_2FASecrete';
import { PaginationResult } from 'src/common/dto/pagination.dto';
import { UserQueryDTO, UserStatistics } from './dto/user-query.dto';
import { plainToClass } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    async findAll(query?: UserQueryDTO): Promise<PaginationResult<User, UserStatistics>> {
        const queryBuilder = this.userRepo
            .createQueryBuilder('user')
            .leftJoin('user.branch', 'branch') // Use LEFT JOIN to include null branch_id
            .innerJoin('branch.hotel', 'hotel') // Join Hotel table

        if (query?.hotel_id) {
            queryBuilder.andWhere('hotel.id = :hotel_id', { hotel_id: query.hotel_id });
        }


        if (query?.branch_id) {
            queryBuilder.andWhere('branch.id = :branch_id', { branch_id: query.branch_id });
        }


        if (query?.search_key) {
            queryBuilder.andWhere(
                new Brackets(qb => {
                    qb.where('user.name LIKE :search_key', { search_key: `%${query.search_key}%` })
                    // .orWhere('user.code LIKE :search_key', { search_key: `%${query.search_key}%` })
                })
            );
        }

        // Apply pagination
        const [users, total] = await queryBuilder
            .skip((query.page - 1) * query.limit)
            .take(query.limit)
            .getManyAndCount();

        // Transform the raw database results to properly apply the @Transform decorators
        const list = plainToClass(User, users, { excludeExtraneousValues: false });

        // Calculate statistics (active vs inactive users)
        const total_active = users.filter((user) => user.active).length;
        const total_inactive = users.filter((user) => !user.active).length;

        // Return paginated results with statistics
        return new PaginationResult<User, UserStatistics>({
            list: list,
            total_record: total,
            page: query.page,
            limit: query.limit,
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
     
        try {
            const result = await this.userRepo
                .createQueryBuilder()
                .insert()
                .into(User) // Replace 'user' with your actual table name if different
                .values({
                    name: dto.name,
                    username: dto.username,
                    email: dto.email,
                    password: dto.password,
                })
                .execute();

            // If you need the full entity, fetch it after insertion
            const user = await this.findOneById(result.identifiers[0].id)

            return plainToClass(User, user, { excludeExtraneousValues: false });
        } catch (error) {

            if (error instanceof QueryFailedError) {
                const errorMessage = error.message;

                if (errorMessage.includes('UQ_user_username')) {
                    throw new ConflictException(`username "${dto.name}" already registered`);
                }

                if (errorMessage.includes('UQ_user_name')) {
                    throw new ConflictException(`name "${dto.name}" already exists`);
                }

                if (errorMessage.includes('UQ_user_code')) {
                    throw new ConflictException(`code "${dto.code}" is already exists`);
                }

                if (errorMessage.includes('UQ_user_email')) {
                    throw new ConflictException(`Email "${dto.email}" is already registered`);
                }

                throw new ConflictException('Duplicate entry - one of the unique fields already exists');
            }
            // Re-throw the error if it's not a duplicate entry error
            throw error;
        }
    }

        async update(id: number, dto: UpdateUserDto) {
         
            try {
    
                // await this.userRepo
                //     .createQueryBuilder()
                //     .update(User)
                //     .set({
                //         name: dto.name,
                //         email: dto.email,
                //         phone: dto.,
                //         address: dto.address,
                //         note: dto.note,
                //         ...(dto.image && { image: dto.image })
                //     })
                //     .where("id = :id", { id })
                //     .execute();
    
                const user = await this.findOneById(id);
                
                return plainToClass(User, user, { excludeExtraneousValues: false });
            } catch (error) {
    
    
                if (error instanceof QueryFailedError) {
                    const errorMessage = error.message;
    
                
                    if (errorMessage.includes('UQ_user_name')) {
                        throw new ConflictException(`name "${dto.name}" already exists`);
                    }
    
                    if (errorMessage.includes('UQ_user_code')) {
                        throw new ConflictException(`code "${dto.code}" is already exists`);
                    }
    
                    if (errorMessage.includes('UQ_user_email')) {
                        throw new ConflictException(`Email "${dto.email}" is already registered`);
                    }
    
                    throw new ConflictException('Duplicate entry - one of the unique fields already exists');
                }
    
                // Re-throw the error if it's not a duplicate entry error
                throw error;
            }
    
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
