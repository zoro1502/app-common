import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, catchError, map } from 'rxjs';
import { BadRequestException } from 'src/helpers/response/badRequest';

@Injectable()
export class HttpClientService {
	private headers: {};
	private CONTENT_TYPE;

	constructor(private readonly http: HttpService) {
		this.headers = {
			'Content-Type': 'text/html',
		};
		this.CONTENT_TYPE = {
			APPLICATION_JSON: 'application/json',
			TEXT_HTML: 'text/html',
		};
	}


	// async postMethod(url: string, data: any, urlEncode: boolean = false, headers?: any) {
	// 	try {
	// 		const httpHeader = {
	// 			...headers,
	// 			'Content-Type': urlEncode ? 'application/x-www-form-urlencoded' : this.CONTENT_TYPE.APPLICATION_JSON
	// 		};
	// 		console.log('--[Post]----' + url + '------>', data);
	// 		return await this.http
	// 			.post(url, data, { headers: httpHeader })
	// 			.pipe(map((res: any) => res.data),
	// 				(error: any) => {
	// 					let resError = error?.response?.data || {
	// 						status: 'error',
	// 						message: error?.message || 'Error post data'
	// 					};
	// 					return resError;
	// 				});
	// 	} catch (error) {
	// 		console.log('--------error@Post method ------' + url, error?.response?.data);
	// 		// let resError = error?.response?.data || {
	// 		// 	status: 'error',
	// 		// 	message: error?.message || 'Error post data'
	// 		// };
	// 		// return resError;
	// 	}
	// }

	// async putMethod(url: string, data: any, urlEncode: boolean = false, headers?: any) {
	// 	try {
	// 		const httpHeader = {
	// 			...headers,
	// 			'Content-Type': urlEncode ? 'application/x-www-form-urlencoded' : this.CONTENT_TYPE.APPLICATION_JSON
	// 		};
	// 		console.log('--[Put]----' + url + '------>', data);
	// 		return await this.http
	// 			.put(url, data, { headers: httpHeader })
	// 			.pipe(map((res: any) => res.data),
	// 				(error: any) => {
	// 					let resError = error?.response?.data || {
	// 						status: 'error',
	// 						message: error?.message || 'Error put data'
	// 					};
	// 					return resError;
	// 				});
	// 	} catch (error) {
	// 		console.log('--------error@Put method ------' + url, error?.response?.data);
	// 		let resError = error?.response?.data || {
	// 			status: 'error',
	// 			message: error?.message || 'Error put data'
	// 		};
	// 		return resError;
	// 	}
	// }

	async getMethod(url: string, data: any, headers?: any) {
		const httpHeader = {
			...headers,
			'Content-Type': this.CONTENT_TYPE.APPLICATION_JSON
		};
		console.log('--[Get]----' + url + '------>', data);
		const response: any = await this.http.axiosRef.get(url, { headers: httpHeader, params: data });
		if(response?.status == 200) {
			return response?.data;
		}
		return null;

	}

	// async deleteMethod(url: string, headers?: any) {
	// 	try {
	// 		const httpHeader = {
	// 			...headers,
	// 			'Content-Type': CONTENT_TYPE.APPLICATION_JSON
	// 		};
	// 		return await this.http
	// 			.put(url, { headers: httpHeader })
	// 			.pipe(map((response) => response.data))
	// 			.toPromise();
	// 	} catch (error) {
	// 		console.log('--------error@Delete method ------' + url, error?.response?.data);
	// 		let resError = error?.response?.data || {
	// 			status: 'error',
	// 			message: error?.message || 'Error get data'
	// 		};
	// 		return resError;
	// 	}
	// }

}
