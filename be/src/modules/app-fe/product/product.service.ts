import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IPaging, Paging } from 'src/helpers/helper';
import { HttpClientService } from 'src/modules/processor/httpClientService.processor';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class ProductService {

	constructor(
		private httpClientService: HttpClientService
	) {

	}

	create(createProductDto: CreateProductDto) {
		return 'This action adds a new product';
	}

	async findAll(paging: IPaging, filters: any, token: any) {
		let url = `https://apis.haravan.com/com/`;
		let headers = {
			'Authorization': token
		}
		const response = await this.httpClientService.getMethod(url + 'products.json', { ...filters, limit: 10 }, headers);
		const dataCount = await this.httpClientService.getMethod(url + 'products/count.json', { ...filters, limit: 10 }, headers);
		let newPaging = new Paging(paging.page, paging.page_size, dataCount?.count || 0);
        return {
			...response,
           meta: newPaging
		};
	}

	findOne(id: number) {
		return `This action returns a #${id} product`;
	}

	update(id: number, updateProductDto: UpdateProductDto) {
		return `This action updates a #${id} product`;
	}

	remove(id: number) {
		return `This action removes a #${id} product`;
	}
}
