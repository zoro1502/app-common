import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Put, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { BadRequestException } from 'src/helpers/response/badRequest';
import { BaseResponse, HTTP_STATUS } from 'src/helpers/helper';
import * as _ from 'lodash';
import { RefreshTokenDto } from './dtos/refresh.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { JwtGuard } from './guards/jwt/jwt.guard';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
@ApiTags('Admin Auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	// @Post('login')
	// @ApiResponse({ status: 200, description: 'success' })
	// async createData(
	// 	@Body() formDto: LoginDto
	// ) {
	// 	try {
	// 		if (_.isEmpty(formDto)) {
	// 			throw new BadRequestException({ code: 'F0001' });
	// 		}
	// 		const result = await this.authService.login(formDto);

	// 		return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
	// 	} catch (error) {
	// 		console.log('e@LoginDto----> ', error);
	// 		return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
	// 	}
	// }

	// @Put('/profile')
	// @UseGuards(JwtGuard)
	// @ApiResponse({ status: 200, description: 'success' })
	// async updateProfile(
	// 	@Request() req: any,
	// 	@Body() formDto: UpdateProfileDto
	// ) {
	// 	try {
	// 		const user_id = req.user.id || null;
	// 		if(!user_id) {
	// 			throw new BadRequestException({ code: 'LG0001', message:'test' });
	// 		}
	// 		if (_.isEmpty(formDto)) {
	// 			throw new BadRequestException({ code: 'F0001' });
	// 		}
	// 		const result = await this.authService.updateProfile(user_id, formDto);

	// 		return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
	// 	} catch (error) {
	// 		console.log('e@UpdateProfile----> ', error);
	// 		return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
	// 	}
	// }

	// @Get('/profile')
	// @UseGuards(JwtGuard)
	// @ApiResponse({ status: 200, description: 'success' })
	// async profile(
	// 	@Request() req: any,
	// ) {
	// 	try {
	// 		const user_id = req.user.id || null;
	// 		if(!user_id) {
	// 			throw new BadRequestException({ code: 'LG0001' });
	// 		}
	// 		const result = await this.authService.findById(user_id);

	// 		return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
	// 	} catch (error) {
	// 		console.log('e@UpdateProfile----> ', error);
	// 		return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
	// 	}
	// }

	// @Post('register/admin')
	// @ApiResponse({ status: 200, description: 'success' })
	// async registerAdmin(
	// 	@Body() formDto: any
	// ) {
	// 	try {
	// 		if (_.isEmpty(formDto)) {
	// 			throw new BadRequestException({ code: 'F0001' });
	// 		}
	// 		const result = await this.authService.registerAdmin(formDto);

	// 		return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
	// 	} catch (error) {
	// 		console.log('e@LoginDto----> ', error);
	// 		return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
	// 	}
	// }

	// @Put('update-password')
	// @ApiResponse({ status: 200, description: 'success' })
	// @UseGuards(JwtGuard)
	// async updatePassword(
	// 	@Body() formDto: any,
	// 	@Request() req: any,
	// ) {
	// 	try {
	// 		if (_.isEmpty(formDto)) {
	// 			throw new BadRequestException({ code: 'F0001' });
	// 		}

	// 		const user_id = req.user.id || null;
	// 		if(!user_id) {
	// 			throw new BadRequestException({ code: 'LG0001', message:'test' });
	// 		}

	// 		const result = await this.authService.updatePassword(user_id, formDto);

	// 		return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
	// 	} catch (error) {
	// 		console.log('e@updatePassword----> ', error);
	// 		return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
	// 	}
	// }

	// @Post('register')
	// @ApiResponse({ status: 200, description: 'success' })
	// async register(
	// 	@Body() formDto: RegisterDto
	// ) {
	// 	try {
	// 		if (_.isEmpty(formDto)) {
	// 			throw new BadRequestException({ code: 'F0001' });
	// 		}
	// 		const result = await this.authService.register(formDto);

	// 		return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
	// 	} catch (error) {
	// 		console.log('e@LoginDto----> ', error);
	// 		return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
	// 	}
	// }
}
