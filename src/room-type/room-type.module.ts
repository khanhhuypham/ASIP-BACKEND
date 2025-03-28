import { Module } from '@nestjs/common';
import { RoomTypeService } from './room-type.service';
import { RoomTypeController } from './room-type.controller';
import { RoomType } from './entities/room-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/room/entities/room.entity';

@Module({
    imports: [TypeOrmModule.forFeature([RoomType,Room])],
    controllers: [RoomTypeController],
    providers: [RoomTypeService],
    exports: [RoomTypeService]
})
export class RoomTypeModule { }
