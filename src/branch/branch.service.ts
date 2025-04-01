import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Branch } from './entities/branch.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Like, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { QueryBranchDTO } from './dto/branch-query-dto';

@Injectable()
export class BranchService {
    constructor(
        @InjectRepository(Branch)
        private branchRepo: Repository<Branch>
    ) { }


    async create(dto: CreateBranchDto) {

        const branch = await this.branchRepo.save({
            name: dto.name,
            image: dto.image,
            email: dto.email,
            phone: dto.phone,
            address: dto.address,
            note: dto.note,
        });

        return plainToClass(Branch, branch, { excludeExtraneousValues: false });
    }

    async findAll(query?:QueryBranchDTO) {
        const queryBuilder = this.branchRepo.createQueryBuilder('branch');
    
        // Filter by hotel_id if provided
        if (query?.hotel_id) {
            queryBuilder.andWhere('branch.hotel.id = :hotel_id', { hotel_id: query.hotel_id });
        }

        
    
        // Filter by search_key if provided
        if (query?.search_key) {
            queryBuilder.andWhere(
                new Brackets(qb => {
                    qb.where('branch.name LIKE :search_key', { search_key: `%${query.search_key}%` })
                      .orWhere('branch.address LIKE :search_key', { search_key: `%${query.search_key}%` })
                      .orWhere('hotel.name LIKE :search_key', { search_key: `%${query.search_key}%` });
                })
            );
        }

        // Include hotel relation
        queryBuilder.leftJoinAndSelect('branch.hotel', 'hotel');
    
    
        // Execute the query and return results
        return await queryBuilder.getMany();
    }

    async findOne(id: number): Promise<Branch | null> {
        const branch = await this.branchRepo.findOne({
            where: {
                id: id,
            },
            relations: {
                hotel: true
            }
        })
        return branch;
    }

    async update(id: number, dto: UpdateBranchDto) {
        const existingBranch = await this.findOne(id)


        if (!existingBranch) {
            throw new NotFoundException(`branch id ${id} not found`);
        }


        if (dto.image) {
            existingBranch.image = dto.image;
        }


        // Update the properties of the existing entity with the data from the DTO
        existingBranch.name = dto.name;
        existingBranch.email = dto.email;
        existingBranch.phone = dto.phone;
        existingBranch.address = dto.address;
        existingBranch.note = dto.note;

        await this.branchRepo.save(existingBranch); // Return the updated room type

        // Transform the raw database results to properly apply the @Transform decorators
        return plainToClass(Branch, existingBranch, { excludeExtraneousValues: false });
    }

    async changeStatus(id: number) {
        const existingBranch = await this.findOne(id)


        if (!existingBranch) {
            throw new NotFoundException(`branch id ${id} not found`);

        }

        existingBranch.active = !existingBranch.active;

        await this.branchRepo.save(existingBranch); // Return the updated room type

        // Transform the raw database results to properly apply the @Transform decorators
        return plainToClass(Branch, existingBranch, { excludeExtraneousValues: false });

    }


    remove(id: number) {
        return `This action removes a #${id} branch`;
    }
}
