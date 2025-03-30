import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfigService } from './config/typeorm.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guard/jwt.guard';
import { ConfigModule } from '@nestjs/config';
import { RoomTypeModule } from './room-type/room-type.module';
import { GuestModule } from './guest/guest.module';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';
import { EquipmentModule } from './equipment/equipment.module';
import { UploadFileModule } from './upload-file/upload-file.module';
import { AreaModule } from './area/area.module';
import { PriceModule } from './price/price.module';
import { GuestGroupModule } from './guest-group/guest-group.module';
import { HotelModule } from './hotel/hotel.module';
import { BranchModule } from './branch/branch.module';



@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({useClass:TypeOrmConfigService}),
        UserModule,
        AuthModule,
        RoomTypeModule,
        GuestModule,
        RoomModule,
        BookingModule,
        EquipmentModule,
        UploadFileModule,
        AreaModule,
        PriceModule,
        GuestGroupModule,
        HotelModule,
        BranchModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: JwtGuard,
        }
    ],
})
export class AppModule { }
