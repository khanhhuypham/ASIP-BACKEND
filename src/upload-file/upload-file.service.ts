import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Media } from './entities/media.entity';
import { Media_Type } from 'src/common/constant/enum';
import { join } from 'path';
import { promises as fs } from 'fs';


export const MAX_FILE_SIZE_IN_BYTES = 5 * 1024 * 1024; // 5MB
export const UPLOADDIR = join(process.cwd(), 'resource'); // Upload destination
export const ALLOWED_MIMETYES = ['image/jpeg', 'image/png', 'application/pdf'];
@Injectable()
export class UploadFileService {
    constructor(
        @InjectRepository(Media)
        private readonly mediaRepo: Repository<Media>,
    ) { }



    async saveImages(images: Express.Multer.File[], target: string): Promise<Media[]> {

        // find existing images base on target, if existed => delete and insert. otherwise insert 

        const existingMedia = await this.findAllByName(target);

        if (existingMedia.length > 0) {
            await this.deleteFiles(existingMedia.map((media) => media.url))
            await this.mediaRepo.delete({name:target})
        }

        const validatedFiles = this.handleFilesUpload(images);
       
        const savedImages = await this.mediaRepo.save(
            validatedFiles.map(image => ({
                name: target,
                url: image.filename,
                type: Media_Type.image,
            })),
        );


        return savedImages.map(image => {
            delete image.name
            return image
        });
    }

    async findAllByName(name: string): Promise<Media[]> {

        const media = await this.mediaRepo.find({
            where: {
                name:name
            }
        })

        return media;
    }


    handleFilesUpload(files: Express.Multer.File[]): Express.Multer.File[] {
        if (files.length === 0) {
            throw new BadRequestException('No file uploaded');
        }

  
        const validatedFiles: Express.Multer.File[] = [];

        for (const file of files) {
            if (!ALLOWED_MIMETYES.includes(file.mimetype)) {
                throw new BadRequestException('Invalid file type');
            }

            if (file.size > MAX_FILE_SIZE_IN_BYTES) {
                throw new BadRequestException('File is too large');
            }

            validatedFiles.push(file);
        }


        return validatedFiles;
    }


    async deleteFile(filename: string): Promise<void> {
        const filePath = join(UPLOADDIR, filename);

        try {
            await fs.unlink(filePath); // Asynchronously delete the file
        } catch (error) {
            // Handle errors appropriately
            if (error.code === 'ENOENT') {
                // File not found - could be a 404 or you might just log it
                throw new NotFoundException(`File not found: ${filename}`);
            } else {
                // Other errors (permissions, etc.) -  re-throw or handle
                console.error('Error deleting file:', error); // Log the error
                throw error; // Re-throw the error for higher-level handling
            }
        }
    }

    // Optional:  Add a method to check if a file exists
    async fileExists(filename: string): Promise<boolean> {
        const filePath = join(UPLOADDIR, filename);
        try {
            await fs.access(filePath);
            return true; // File exists
        } catch {
            return false; // File doesn't exist (or other access error)
        }
    }


    async deleteFiles(filenames: string[]): Promise<{ success: string[]; failed: { filename: string; error: any }[] }> {
        const results = {
            success: [] as string[],
            failed: [] as { filename: string; error: any }[],
        };
    
        const deletionPromises = filenames.map(async (filename) => {
            try {
                await this.deleteFile(filename);
                results.success.push(filename);
            } catch (error) {
                results.failed.push({ filename, error });
            }
        });
    
        await Promise.all(deletionPromises);

        return results;
    }

}