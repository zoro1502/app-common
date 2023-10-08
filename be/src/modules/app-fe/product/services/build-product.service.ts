import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigEntity } from 'src/entities/config.entity';
import { HttpClientService } from 'src/modules/processor/httpClientService.processor';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { BadRequestException } from 'src/helpers/response/badRequest';
import { IProduct, IProductImage, IProductOption, IProductVariant } from 'src/helpers/interface/product.interface';
import { ProductDto } from '../dto/product.dto';

@Injectable()
export class BuildProductService {

	constructor(
		@Inject(HttpClientService)
		private readonly httpClientService: HttpClientService,

		@InjectRepository(ConfigEntity) private readonly configRepo: Repository<ConfigEntity>,
	) { }

	async buildParamsSearch(config: any, filters: any) {
		let paramsKey: any = config.params_search;
		let params = paramsKey.reduce((newParams: any, item: any) => {
			if (filters[`${item.key}`]) {
				newParams[`${item.param}`] = filters[`${item.key}`];
			}
			return newParams;
		}, {});

		return params;
	}

	async buildProducts(config: any, params: any = {}, product_id: number = 0) {
		let urlConfig: any = config.url;
		let url = `${urlConfig.normal}${product_id && `/${product_id}` || ''}${urlConfig.prefix_normal}` ;
		let responseConfig = config.response;
		let headers: any = {
			'Authorization': urlConfig.token
		};
		let dataBuild = [];
		let total = 0;
		const response = await this.httpClientService.getMethod(url, params, headers);
		if (!_.isEmpty(response)) {
			let data = response[`${config?.response_type?.key_data}`];
			if (!_.isEmpty(data)) {
				if(!product_id) {
					for (let item of data) {
						const newProduct = await this.buildProductItem(item, responseConfig);
						console.log('new product---------> ', newProduct);
						if(!_.isEmpty(newProduct)) {
							dataBuild.push(newProduct);
						}
					}
					if(config?.response_type?.total) {
						total = response[`${config?.response_type?.total}`] || 0;
					} else {
						let urlCount = `${urlConfig.normal}/${urlConfig.count_total}${urlConfig.prefix_normal}`;
						const responseCount = await this.httpClientService.getMethod(urlCount, params, headers);
						total = responseCount && responseCount[`${urlConfig.count_total}`] || 0
					}
					
					return {products: dataBuild, total: total};
				} else {
					return await this.buildProductItem(data, responseConfig);
				}
			}
		}
		return null;
	}

	async buildProductItem(product: any, responseConfig: any) {
		let newProduct = new ProductDto();
		newProduct.id = product[`${responseConfig.id}`];
		newProduct.body_html = product[`${responseConfig.body_html}`];
		newProduct.created_at = product[`${responseConfig.created_at}`];
		newProduct.name = product[`${responseConfig.name}`];
		newProduct.updated_at = product[`${responseConfig.updated_at}`];
		newProduct.images = await this.buildImageProduct(responseConfig.images, product);
		newProduct.variants = await this.buildVariantProduct(responseConfig.variants, product) || [];
		newProduct.options_variant = await this.buildOptionsProduct(responseConfig.options_variant, product);
		return newProduct;
	}

	async buildImageProduct(config: any, product: any) {
		let images: IProductImage[] = [];
		let responseOption = product[`${config.key}`] || [];
		if (!_.isEmpty(config) && !_.isEmpty(responseOption)) {
			if (config.type === 'array') {
				images = responseOption.reduce((newOption: IProductImage[], item: any) => {
					let obj: IProductImage = {
						product_id: item[`${config.product_id}`],
						variant_ids: item[`${config.variant_ids}`],
						src: item[`${config.src}`]
					};
					newOption.push(obj);
					return newOption;
				}, []);
			} else {
				let newOption: IProductImage = {
					product_id: responseOption[`${config.product_id}`],
					variant_ids: responseOption[`${config.variant_ids}`],
					src: responseOption[`${config.src}`]
				};
				images.push(newOption);
			}
		}
		return images;
	}

	async buildVariantProduct(config: any, product: any) {
		let responseVariants = product[`${config?.key}`] || [];
		let newVariants: IProductVariant[] = [];
		if (!_.isEmpty(config) && !_.isEmpty(responseVariants)) {
			if (config.type === 'array') {
				for (let item of responseVariants) {
					let variant: IProductVariant = {
						id: item[`${config.id}`],
						sku: item[`${config.sku}`],
						price: item[`${config.price}`] || 0,
						product_id: item[`${config.product_id}`],
						original_price: item[`${config.original_price}`] || 0,
						options: []
					}
					if (config.options?.length > 0) {
						let options = config.options.reduce((newOption: any, op: any) => {
							let obj = {
								key: op.value,
								value: item[op.value]
							}
							newOption.push(obj);
							return newOption;
						}, []);
						console.log('options-----------> ', options);
						variant.options = options;
					}
					console.log('variant--------> ', variant);
					newVariants.push(variant);
				}
			}
		}
		return newVariants;
	}

	async buildOptionsProduct(config: any, product: any) {
		let options: IProductOption[] = [];
		let responseOption = product[`${config.key}`] || [];
		if (!_.isEmpty(config) && !_.isEmpty(responseOption)) {
			if (config.type === 'array') {
				options = responseOption.reduce((newOption: IProductOption[], item: any) => {
					let obj: IProductOption = {
						id: item[`${config.id}`],
						name: item[`${config.name}`],
						position: item[`${config.position}`]
					};
					newOption.push(obj);
					return newOption;
				}, []);
			} else {
				let newOption: IProductOption = {
					id: responseOption[`${config.id}`],
					name: responseOption[`${config.name}`],
					position: responseOption[`${config.position}`]
				};
				options.push(newOption);
			}
		}
		return options;

	}
}
