import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, StreamableFile, UploadedFiles, Res } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { type Response } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

import { join } from 'path';
import { Public } from 'src/auth/decorators/public.decorator';
import { IsString } from 'class-validator';

@Controller('media')
export class UploadFileController {
    constructor(private readonly uploadFileService: UploadFileService) { }


    @Post('upload')
    @UseInterceptors(FilesInterceptor('files', 10))
    uploadFile( 
        @UploadedFiles() files: Express.Multer.File[],
        @Body() dto: {
            target:string
        }, // Capture id from request body
    ) {
      
        return this.uploadFileService.saveImages(files,dto.target);
    }


    @Public()
    @Get('/:url')
    getUserProfilePhoto(@Param('url') url: string, @Res() res: Response) {
        const path = join(process.cwd(), "resource/") + url
        return res.sendFile(path);
    }


}
