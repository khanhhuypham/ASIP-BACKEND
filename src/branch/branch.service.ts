
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { Branch } from './entities/branch.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Like, QueryFailedError, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { QueryBranchDTO } from './dto/branch-query-dto';
import { Hotel } from 'src/hotel/entities/hotel.entity';

@Injectable()
export class BranchService {
    constructor(
        @InjectRepository(Branch)
        private branchRepo: Repository<Branch>,
        @InjectRepository(Hotel)
        private hotelRepo: Repository<Hotel>
    ) { }



    async create(dto: CreateBranchDto) {
        const existingHotel = await this.findHotelById(dto.hotel_id);

        if (!existingHotel) {
            throw new NotFoundException(`hotel id ${dto.hotel_id} not found`);
        }

        try {
            // Insert the new branch
            const result = await this.branchRepo
                .createQueryBuilder()
                .insert()
                .into(Branch)
                .values({
                    name: dto.name,
                    image: dto.image,
                    email: dto.email,
                    phone: dto.phone,
                    address: dto.address,
                    note: dto.note,
                    hotel: existingHotel
                })
                .execute();

            // Retrieve the inserted branch using the result's generated ID
            const branch = await this.findOne(result.identifiers[0].id)

            return plainToClass(Branch, branch, { excludeExtraneousValues: false });
        } catch (error) {


            if (error instanceof QueryFailedError) {
                const errorMessage = error.message;

                if (errorMessage.includes('UQ_branch_name')) {
                    throw new ConflictException(`Hotel name "${dto.name}" already exists`);
                }

                if (errorMessage.includes('UQ_branch_email')) {
                    throw new ConflictException(`Email "${dto.email}" is already registered`);
                }

                throw new ConflictException('Duplicate entry - one of the unique fields already exists');
            }

            // Re-throw the error if it's not a duplicate entry error
            throw error;
        }
    }


    async findAll(query?: QueryBranchDTO) {
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
 
        const branchList =  await queryBuilder.getMany()
        // Execute the query and return results
        return  plainToClass(Branch, branchList, { excludeExtraneousValues: false });
    }

    async findOne(id: number): Promise<Branch | null> {
        const branch = await this.branchRepo
            .createQueryBuilder("branch")
            .leftJoinAndSelect("branch.hotel", "hotel")
            .where("branch.id = :id", { id: id }).getOne()

        return branch;
    }

    async update(id: number, dto: UpdateBranchDto) {
        const existingBranch = await this.findOne(id);

        if (!existingBranch) {
            throw new NotFoundException(`branch id ${id} not found`);
        }

        try {

            await this.branchRepo
                .createQueryBuilder()
                .update(Branch)
                .set({
                    name: dto.name,
                    email: dto.email,
                    phone: dto.phone,
                    address: dto.address,
                    note: dto.note,
                    ...(dto.image && { image: dto.image })
                })
                .where("id = :id", { id })
                .execute();

            const updatedBranch = await this.findOne(id);
            return plainToClass(Branch, updatedBranch, { excludeExtraneousValues: false });
        } catch (error) {


            if (error instanceof QueryFailedError) {
                const errorMessage = error.message;

                if (errorMessage.includes('UQ_branch_name')) {
                    throw new ConflictException(`Hotel name "${dto.name}" already exists`);
                }

                if (errorMessage.includes('UQ_branch_email')) {
                    throw new ConflictException(`Email "${dto.email}" is already registered`);
                }

                throw new ConflictException('Duplicate entry - one of the unique fields already exists');
            }

            // Re-throw the error if it's not a duplicate entry error
            throw error;
        }


    }

    async toggleActive(id: number) {
        const existingBranch = await this.findOne(id);

        if (!existingBranch) {
            throw new NotFoundException(`branch id ${id} not found`);
        }

        await this.branchRepo
            .createQueryBuilder()
            .update(Branch)
            .set({ active: !existingBranch.active })
            .where("id = :id", { id })
            .execute();

        const updatedBranch = await this.findOne(id);
        return plainToClass(Branch, updatedBranch, { excludeExtraneousValues: false });
    }




    async findHotelById(id: number): Promise<Hotel | null> {

        return await this.hotelRepo.createQueryBuilder("hotel").where("hotel.id = :id", { id: 1 }).getOne();
        
    }

}
