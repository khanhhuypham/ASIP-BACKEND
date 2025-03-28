import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './entities/area.entity';
import { Room } from 'src/room/entities/room.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Area, Room])],
    controllers: [AreaController],
    providers: [AreaService],
    exports: [AreaService]
})
export class AreaModule { }
