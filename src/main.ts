import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/transform.interceptor';
import { JwtGuard } from './auth/guard/jwt.guard';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {


    const app = await NestFactory.create(AppModule);
    // const SERVICE_NAME = process.env.npm_package_name.toUpperCase();
    const PREFIX = 'api/v1';
    app.enableCors();
    app.setGlobalPrefix(PREFIX);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    // app.useGlobalPipes(
    //     new ValidationPipe({
    //         transform: true,
    //         stopAtFirstError: true,
    //     }),
    // );

    app.useGlobalGuards(new JwtGuard(app.get(Reflector)));
    app.useGlobalInterceptors(new ResponseInterceptor());
  
    // const config = new DocumentBuilder()
    //     .setTitle("Phạm khánh Huy's ASIP App")
    //     .setDescription('The ASIP App API description')
    //     .setVersion('0.1')
    //     .build();

    // const document = SwaggerModule.createDocument(app, config);
    // SwaggerModule.setup("/swagger", app, document)

    await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
