import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { Guest } from './entities/guest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestGroupModule } from 'src/guest-group/guest-group.module';

@Module({
    imports: [TypeOrmModule.forFeature([Guest]),GuestGroupModule],
    controllers: [GuestController],
    providers: [GuestService],
    exports: [GuestService]
})
export class GuestModule { }
