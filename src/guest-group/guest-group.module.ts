import { Module } from '@nestjs/common';
import { GuestGroupService } from './guest-group.service';
import { GuestGroupController } from './guest-group.controller';
import { GuestGroup } from './entities/guest-group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([GuestGroup])],
    controllers: [GuestGroupController],
    providers: [GuestGroupService],
    exports: [GuestGroupService]
})
export class GuestGroupModule { }
