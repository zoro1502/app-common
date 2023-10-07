import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { HttpClientService } from 'src/modules/processor/httpClientService.processor';
import { HttpModule } from '@nestjs/axios';

@Module({
	imports: [
		HttpModule
	],

  controllers: [ProductController],
  providers: [ProductService, HttpClientService]
})
export class ProductModule {}
