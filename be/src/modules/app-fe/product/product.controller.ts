import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Headers } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiResponse } from '@nestjs/swagger';
import { BaseResponse, HTTP_STATUS, IPaging } from 'src/helpers/helper';
import { BadRequestException } from 'src/helpers/response/badRequest';

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) { }

	@Post()
	create(@Body() ProductDto: ProductDto) {
		return this.productService.create(ProductDto);
	}

	async buildFilter(@Request() req: any) {
		const filters = {
			product_id: req.query.product_id || null,
			name: req.query.name || null,
			category_id: req.query.category_id || null,
			status: req.query.status || null,
		};
		return filters;
	}

	
	@Get('')
	async findAll(
		@Request() req: any,
		@Headers() headers: any
	) {
		try {
			const app_code = headers['x-code'];
			if(!app_code) {
				throw new BadRequestException({code: '401', message: 'Unauthorize!'});
			}
			const filters: any = await this.buildFilter(req);
			filters.app_code = app_code;
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20
			};
			const response = await this.productService.findAll(paging, filters);
			return BaseResponse(HTTP_STATUS.success, response, '', 'successfully');
		} catch (error) {
			console.log('e@getProduct----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	@Get(':id')
	async findOne(@Param('id') id: number, @Request() req: any, @Headers() headers: any) {
		try {
			const app_code = headers['x-code'];
			if(!app_code) {
				throw new BadRequestException({code: '401', message: 'Unauthorize!'});
			}
			const filters: any = {
				app_code: app_code
			}
			const response = await this.productService.findOne(id, filters);
			return BaseResponse(HTTP_STATUS.success, response, '', 'successfully');
		} catch (error) {
			console.log('e@findOneProduct---> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
		return this.productService.update(+id, updateProductDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.productService.remove(+id);
	}
}
