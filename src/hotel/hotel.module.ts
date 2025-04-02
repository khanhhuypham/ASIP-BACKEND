import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { Hotel } from './entities/hotel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchModule } from 'src/branch/branch.module';

@Module({
    imports: [TypeOrmModule.forFeature([Hotel]),BranchModule],
    controllers: [HotelController],
    providers: [HotelService]
})
export class HotelModule { }
