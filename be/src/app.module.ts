import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from 'src/database/database.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './helpers/helper';
// import { AuthModule } from './modules/auth/auth.module';
import { AppFe } from './modules/app-fe/appFe.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                POSTGRES_HOST: Joi.string().required(),
                POSTGRES_PORT: Joi.number().required(),
                POSTGRES_USER: Joi.string().required(),
                POSTGRES_PASSWORD: Joi.string().required(),
                POSTGRES_DB: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRATION_TIME: Joi.string().required(),
            })
			
        }),
        DatabaseModule,
        AdminModule,
        // AuthModule,
		AppFe
    ],
    controllers: [],
    providers: [
		{
			provide: APP_FILTER,
			useClass: ExceptionsLoggerFilter,
		}
	],
})
export class AppModule { }
