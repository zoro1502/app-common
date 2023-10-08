import { Inject, Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IPaging, Paging } from 'src/helpers/helper';
import { HttpClientService } from 'src/modules/processor/httpClientService.processor';
import { BuildProductService } from './services/build-product.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigEntity } from 'src/entities/config.entity';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { BadRequestException } from 'src/helpers/response/badRequest';
@Injectable()
export class ProductService {

	constructor(
		@Inject(HttpClientService)
		private readonly httpClientService: HttpClientService,
		private buildProduct: BuildProductService,
		@InjectRepository(ConfigEntity) private readonly configRepo: Repository<ConfigEntity>,
	) {}

	create(ProductDto: ProductDto) {
		return 'This action adds a new product';
	}

	async findAll(paging: IPaging, filters: any) {
		const condition = {
			app_code: filters.app_code,
			code: 'products',
			type_url: 'index'
		}
		const config = await this.configRepo.findOne({
			where: condition
		});
		if(_.isEmpty(config)) {
			throw new BadRequestException({code: '404', message: 'Not found code'});
		}
		let params: any = {};
		if(!_.isEmpty(config?.params_search)) {
			params = await this.buildProduct.buildParamsSearch(config, {...filters, ...paging});
		}
		const response: any = await this.buildProduct.buildProducts(config, params);
		return {
				result: response?.products,
			   	meta: new Paging(paging.page, paging.page_size, response?.total)
			};
		
	}

	async findOne(id: number, filters?: any) {
		const condition = {
			app_code: filters.app_code,
			code: 'products',
			type_url: 'show'
		}
		const config = await this.configRepo.findOne({
			where: condition
		});
		if(_.isEmpty(config)) {
			throw new BadRequestException({code: '404', message: 'Not found code'});
		}
		// const params = await this.buildProduct.buildParamsSearch(config, {...filters});
		const response: any = await this.buildProduct.buildProducts(config, {}, id);
		return {
			result: response
		};
	}

	update(id: number, updateProductDto: UpdateProductDto) {
		return `This action updates a #${id} product`;
	}

	remove(id: number) {
		return `This action removes a #${id} product`;
	}
}
