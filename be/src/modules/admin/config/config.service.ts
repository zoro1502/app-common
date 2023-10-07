import { Injectable } from '@nestjs/common';
import { configDto } from './dto/config.dto';

@Injectable()
export class ConfigService {
  create(createConfigDto: configDto) {
    return 'This action adds a new config';
  }

  findAll() {
    return `This action returns all config`;
  }

  findOne(id: number) {
    return `This action returns a #${id} config`;
  }

  update(id: number, updateConfigDto: configDto) {
    return `This action updates a #${id} config`;
  }

  remove(id: number) {
    return `This action removes a #${id} config`;
  }
}
