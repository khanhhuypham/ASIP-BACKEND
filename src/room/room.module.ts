import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Room } from './entities/room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomTypeModule } from 'src/room-type/room-type.module';
import { EquipmentModule } from 'src/equipment/equipment.module';
import { AreaModule } from 'src/area/area.module';

@Module({
    imports:[TypeOrmModule.forFeature([Room]),RoomTypeModule,EquipmentModule,AreaModule],
    controllers: [RoomController],
    providers: [RoomService],
    exports: [RoomService]
})
export class RoomModule { }
