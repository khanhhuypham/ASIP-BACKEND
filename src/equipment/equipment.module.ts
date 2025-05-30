import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { RoomModule } from 'src/room/room.module';
import { Equipment } from './entities/equipment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/room/entities/room.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Equipment, Room])],
    controllers: [EquipmentController],
    providers: [EquipmentService],
    exports: [EquipmentService]
})
export class EquipmentModule { }
