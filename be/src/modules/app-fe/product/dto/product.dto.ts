import { IProductVariant, IProductOption } from "src/helpers/interface/product.interface";

export class ProductDto {
	id: number | string;
	name: string;
	created_at: string | number | Date;
	updated_at: string | number | Date;
	body_html: string;
	images: any;
	variants: IProductVariant[];
	options_variant: IProductOption[]
}
