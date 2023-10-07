import { Injectable, NestMiddleware } from '@nestjs/common';
import * as _ from 'lodash';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AccountMiddleware implements NestMiddleware {
	constructor(
		private readonly jwtService: JwtService
	) { }
	async use(req: any, res: any, next: () => void) {
		
		next();
	}
}
