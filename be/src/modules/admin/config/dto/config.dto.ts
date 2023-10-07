import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class configDto {
	@ApiProperty()
	@IsNotEmpty()
	app_name: string;

	@ApiProperty()
	@IsNotEmpty()
	app_code: string;

	@ApiProperty()
	@IsOptional()
	url?: Object;

	@ApiProperty()
	@IsOptional()
	status?: number;

	@ApiProperty()
	@IsOptional()
	@MaxLength(300, { message: 'Có độ dài tối đa 300 ký tự' })
	type_url?: string;

	@ApiProperty()
	@IsNotEmpty()
	params_search?: Object;

	@ApiProperty()
	@IsOptional()
	headers?: Object;

	@ApiProperty()
	@IsOptional()
	response?: Object;

	@ApiProperty()
	@IsOptional()
	body_request?: Object;

	@ApiProperty()
	@IsOptional()
	@MaxLength(300, { message: 'Có độ dài tối đa 300 ký tự' })
	code?: string;

	updated_at?: any = new Date();
	created_at?: any = new Date()
}
