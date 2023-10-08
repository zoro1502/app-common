import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Put } from '@nestjs/common';
import { ConfigService } from './config.service';
import { configDto } from './dto/config.dto';
import { ApiResponse } from '@nestjs/swagger';
import { BaseResponse, HTTP_STATUS, IPaging } from 'src/helpers/helper';

@Controller('cms/config')
export class ConfigController {
	constructor(private readonly configService: ConfigService) { }

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

	@Post('')
	@ApiResponse({ status: 200, description: 'success' })
	async create(
		@Body() createDto: configDto,
		@Request() req: any
	) {
		try {

			const response = await this.configService.create(createDto);
			return BaseResponse(HTTP_STATUS.success, response, '', 'successfully');
		} catch (error) {
			console.log('e@createConfig----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	@Get('')
	async findAll(
		@Request() req: any
	) {
		try {
			const filters = await this.buildFilter(req);
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20
			};
			const response = await this.configService.findAll(paging, filters);
			return BaseResponse(HTTP_STATUS.success, response, '', 'successfully');
		} catch (error) {
			console.log('e@getConfig----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	@Get(':id')
	async findOne(@Param('id') id: number, @Request() req: any) {
		try {

			const response = await this.configService.findOne(id);
			return BaseResponse(HTTP_STATUS.success, response, '', 'successfully');
		} catch (error) {
			console.log('e@findOneConfig---> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	@Put(':id')
	async update(@Param('id') id: string, @Body() updateCategoryDto: configDto) {
		try {
			const response = await this.configService.update(+id, updateCategoryDto);
			return BaseResponse(HTTP_STATUS.success, response, '', 'successfully');
		} catch (error) {
			console.log('e@updateConfig---> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	@Delete(':id')
	async remove(@Param('id') id: number) {
		try {
			const response = await this.configService.remove(id);
			return BaseResponse(HTTP_STATUS.success, response, '', 'successfully');
		} catch (error) {
			console.log('e@removeConfig---> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}
}
