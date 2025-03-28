
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Response } from '../dto/response.dto';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(
            map((res: unknown) => {
                return this.responseHandler(res, context)
            }),
            catchError((err: HttpException) => {
                // console.log(err)
                return throwError(() => this.errorHandler(err, context))
            })
        );
    }

    errorHandler(exception: HttpException, context: ExecutionContext) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

            // Get the response object from the exception
        // const exceptionResponse = exception.getResponse();
        // // Handle the message property (it could be a string or an array of strings)
        // let message: string | string[] = 'Internal server error';
        // if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        //     // If the response is an object, extract the message
        //     const responseObj = exceptionResponse as { message?: string | string[]; error?: string };
        //     message = responseObj.message || exception.message || 'Internal server error';
        // } else {
        //     // If the response is not an object, fall back to the exception message
        //     message = exception.message || 'Internal server error';
        // }

        // Log the exception response for debugging
        console.log('Exception Response:', exception);

        response.status(status).json({
            status: status,
            message: exception.message || 'Internal server error',
            // message:message,
            data: null,
        });
    }

    responseHandler(res: any, context: ExecutionContext) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const status = response.statusCode

        return {
            status: status,
            message: status >= 400 ? 'error' : 'success',
            data: res,
        };
    }
}
