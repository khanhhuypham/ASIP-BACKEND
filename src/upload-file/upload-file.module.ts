import { Module } from '@nestjs/common';
import { UploadFileController } from './upload-file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadFileService } from './upload-file.service';

import { Media } from './entities/media.entity';
import { UploadConfigService } from './upload-file-config.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Media]),
        MulterModule.registerAsync({
            imports: [UploadFileModule], // Ensure the module is available
            inject: [UploadConfigService], // Inject UploadConfigService instead
            useFactory: (uploadConfigService: UploadConfigService) => uploadConfigService.getMulterConfig(),
        }),
    ],
    controllers: [UploadFileController],
    providers: [UploadFileService, UploadConfigService], // Provide UploadConfigService
    exports: [UploadFileService, UploadConfigService], // Export services if needed
})
export class UploadFileModule {}