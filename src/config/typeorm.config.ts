import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: process.env.DB_HOST,
            port: 3306,
            username:"root",
            password: "1234",
            database: process.env.DB_NAME,
            // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            // timezone: '+07:00',
            // dateStrings: true,
            // multipleStatements: true,
            logging:true,
            // logger: 'advanced-console', // Log query output to the console in a more readable format
            autoLoadEntities: true, // Automatically load models
            synchronize: true,
        };
    }
}