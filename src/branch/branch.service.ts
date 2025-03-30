import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Branch } from './entities/branch.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { promises } from 'dns';

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

    async findAll(hotel_id?: number) {
        if (hotel_id) {
            return await this.branchRepo.find({
                where: {
                    hotel: { id: hotel_id } // Note the nested syntax for relations
                },
                relations: {
                    hotel: true
                }
            })
        } else {
            return await this.branchRepo.find({
                relations: {
                    hotel: true
                }
            })
        }

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
