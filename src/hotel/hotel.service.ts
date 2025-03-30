import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './entities/hotel.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { PaginationResult } from 'src/common/dto/pagination.dto';
import { HotelStatistics, QueryHotelDTO } from './dto/query-hotel-dto';
import { BranchService } from 'src/branch/branch.service';
import { Branch } from 'src/branch/entities/branch.entity';
import { CreateBranchDto } from 'src/branch/dto/create-branch.dto';


@Injectable()
export class HotelService {

    constructor(
        @InjectRepository(Hotel)
        private hotelRepo: Repository<Hotel>,
        private branchService: BranchService
    ) { }

    async create(dto: CreateHotelDto) {
     
        const hotel = await this.hotelRepo.save({
            code: dto.code,
            name: dto.name,
            image: dto.image,
            email: dto.email,
            phone: dto.phone,
            owner_name:dto.owner_name,
            note: dto.note
        });

        if(dto.branch){
           
            let branches:Branch[] = [] 
            branches.push(await this.branchService.create(new CreateBranchDto({...dto.branch,hotel_id:hotel.id})))

            console.log(new CreateBranchDto({...dto.branch,hotel_id:hotel.id}))
    
            this.update(hotel.id,new UpdateHotelDto({...hotel, branch_ids:branches.map((branch) => branch.id)}))
        }


        return plainToClass(Hotel, hotel, { excludeExtraneousValues: false });
    }

    async findAll(query?: QueryHotelDTO): Promise<PaginationResult<Hotel>> {
        const totalRecord = await this.hotelRepo.find()


        const [list, total] = await this.hotelRepo.findAndCount({
            relations: {
                branches: true
            },
            skip: (query.page - 1) * query.limit,
            take: query.limit
        });

        // Transform the raw database results to properly apply the @Transform decorators
        const transformedList = plainToClass(Hotel, list, { excludeExtraneousValues: false });


        return new PaginationResult<Hotel, HotelStatistics>({
            list: transformedList,
            total_record: total,
            page: query.page,
            limit: query.limit
          }, {
            total: totalRecord.length,
            total_active: totalRecord.filter((item) => item.active).length,
            total_inactive: totalRecord.filter((item) => !item.active).length
          });
    }

    async findOne(id: number): Promise<Hotel | null> {
        const hotel = await this.hotelRepo.findOne({
            where: {
                id: id,
            }
        })
        return hotel;
    }

    async update(id: number, dto: UpdateHotelDto) {
        const existingHotel = await this.findOne(id)
        

        if (!existingHotel) {
            throw new NotFoundException(`hotel id ${id} not found`);

        }

    
        if (dto.image) {
            existingHotel.image = dto.image;
        }

        // Update the properties of the existing entity with the data from the DTO
        existingHotel.name = dto.name;
        existingHotel.email = dto.email;
        existingHotel.active = dto.active;
        existingHotel.phone = dto.phone;
        existingHotel.note = dto.note;
        // existingHotel.branches = 
        await this.hotelRepo.save(existingHotel); // Return the updated room type

        // Transform the raw database results to properly apply the @Transform decorators
        return plainToClass(Hotel, existingHotel, { excludeExtraneousValues: false });
    }

    async changeStatus(id: number) {
        const existingHotel = await this.findOne(id)
        

        if (!existingHotel) {
            throw new NotFoundException(`hotel id ${id} not found`);

        }

        existingHotel.active = !existingHotel.active;
  
        await this.hotelRepo.save(existingHotel); // Return the updated room type

        // Transform the raw database results to properly apply the @Transform decorators
        return plainToClass(Hotel, existingHotel, { excludeExtraneousValues: false });

    }

    remove(id: number) {
        return `This action removes a #${id} hotel`;
    }
}
