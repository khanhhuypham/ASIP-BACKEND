import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { Branch } from './entities/branch.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from 'src/hotel/entities/hotel.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Branch])],
    controllers: [BranchController],
    providers: [BranchService],
    exports: [BranchService]
})
export class BranchModule { }
