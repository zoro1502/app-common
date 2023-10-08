import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { HttpClientService } from 'src/modules/processor/httpClientService.processor';
import { HttpModule } from '@nestjs/axios';
import { BuildProductService } from './services/build-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigEntity } from 'src/entities/config.entity';

@Module({
	imports: [
		HttpModule,
		TypeOrmModule.forFeature([ConfigEntity])
	],
	controllers: [
		ProductController
	],
	providers: [
		ProductService,
		HttpClientService,
		BuildProductService
	],
	exports: [
		ProductService,
		BuildProductService
	]
})
export class ProductModule { }
