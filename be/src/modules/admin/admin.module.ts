import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from './config/config.module';

@Module({
    imports: [
		JwtModule,
		ConfigModule,
    ],
    providers: [
		JwtService
	],
    controllers: []
})
export class AdminModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		
	}
 }
