import { Injectable } from "@nestjs/common";

// @Injectable()
// export class RedisConfigService implements RedisModuleOptionsFactory {
//     async createRedisModuleOptions(): Promise<RedisModuleOptions> {
//         return {
//             type: 'single',
//             url: `redis://:${process.env.CONFIG_REDIS_PASSWORD}@${process.env.CONFIG_REDIS_HOST}:${process.env.CONFIG_REDIS_PORT}/${process.env.CONFIG_REDIS_DB}`,
//             options: {
//                 stringNumbers: true,
//             },
//         };
//     }
// }
