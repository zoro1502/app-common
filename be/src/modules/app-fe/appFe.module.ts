import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AccountMiddleware } from './middleware/account.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ProductModule } from './product/product.module';

@Module({
    imports: [
		JwtModule,
		ProductModule
    ],
    providers: [
		JwtService
	],
    controllers: []
})
export class AppFe implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AccountMiddleware)
		.forRoutes('user')
	}
 }
