import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ALLOWED_MIMETYES, MAX_FILE_SIZE_IN_BYTES, UPLOADDIR, UploadFileService } from './upload-file.service';


@Injectable()
export class UploadConfigService {
    constructor(private readonly uploadFileService: UploadFileService) { }

    getMulterConfig() {
        return {
            storage: diskStorage({
                destination: UPLOADDIR,
                filename: (req, file, cb) => {

                    const ext = extname(file.originalname);
                    const filename = `${Date.now()}${ext}`;
                    cb(null, filename);
                },

            }),
            limits: {
                fileSize: MAX_FILE_SIZE_IN_BYTES, // Limit file size to 55MB
            },
            fileFilter: (req, file, cb) => {
                // validate file type
                
                if (!ALLOWED_MIMETYES.includes(file.mimetype)) {
                    cb(new Error('Only images are allowed...'), false);
                    return; // Important: Add a return here to prevent further execution
                }

                cb(null, true);
                
            },
        };
    }
}