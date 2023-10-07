import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Headers } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiResponse } from '@nestjs/swagger';
import { BaseResponse, HTTP_STATUS, IPaging } from 'src/helpers/helper';

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) { }

	@Post()
	create(@Body() createProductDto: CreateProductDto) {
		return this.productService.create(createProductDto);
	}

	async buildFilter(@Request() req: any) {
		const filters = {
			id: req.query.id || null,
			title: req.query.title || null,
			user_id: req.query.user_id || null,
			category_id: req.query.category_id || null,
			status: req.query.status || null,
			hot: req.query.hot || null,
			tags: req.query.tags || null,
			slug: req.query.slug || null,
		};
		return filters;
	}

	
	@Get('')
	async findAll(
		@Request() req: any,
		@Headers() headers: any
	) {
		try {
			let token = headers.authorization;
			const filters = await this.buildFilter(req);
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20
			};
			const response = await this.productService.findAll(paging, filters, token);
			return BaseResponse(HTTP_STATUS.success, response, '', 'successfully');
		} catch (error) {
			console.log('e@getBlog----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	@Get(':id')
	async findOne(@Param('id') id: number, @Request() req: any) {
		try {

			const response = await this.productService.findOne(id);
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
