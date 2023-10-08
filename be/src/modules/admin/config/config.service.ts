import { Injectable } from '@nestjs/common';
import { configDto } from './dto/config.dto';
import { IPaging, Paging } from 'src/helpers/helper';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigEntity } from 'src/entities/config.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConfigService {
	constructor(
		@InjectRepository(ConfigEntity) private readonly configRepo: Repository<ConfigEntity>,
	) { }


	async create(createDto: configDto) {
		let newData = await this.configRepo.create(createDto);
		await this.configRepo.save(newData);
		return newData;
	}

	async findAll(paging: IPaging, filters: any) {
		const [results, total] = await this.configRepo.findAndCount(
			{
				where: {},
				order: { id: 'ASC' },

				take: paging.page_size,
				skip: ((paging.page - 1) * paging.page_size),
			}
		);
		return { result: results, meta: new Paging(paging.page, paging.page_size, total) };
	}

	async findOne(id: number) {
		return await this.configRepo.findOne({
			where: {
				id: id,
			}
		});
	}

	async update(id: number, updateConfigDto: configDto) {
		await this.configRepo.update(id, updateConfigDto);
		return await this.findOne(id);
	}

	remove(id: number) {
		return `This action removes a #${id} config`;
	}
}
