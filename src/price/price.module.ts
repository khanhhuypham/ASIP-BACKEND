import { Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { Price } from './entities/price.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Price])],
    controllers: [PriceController],
    providers: [PriceService],
})
export class PriceModule { }
