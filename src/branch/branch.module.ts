import { Module } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchController } from './branch.controller';
import { Branch } from './entities/branch.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Branch])],
    controllers: [BranchController],
    providers: [BranchService],
    exports: [BranchService]
})
export class BranchModule { }
