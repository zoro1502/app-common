export interface IProductVariant {
	sku: string | undefined,
	id: string | number,
	price: number,
	original_price: number,
	product_id: number | string,
	options?: any
}

export interface IProductOption {
	id: string | number,
	name: string,
	position: string | number
}
export interface IProductImage {
	product_id: string | number,
	variant_ids: number[] | string[],
	src: string
}
export interface IProduct {
	id: number | string,
	name: string,
	created_at: string | number | Date,
	updated_at: string | number | Date,
	body_html: string,
	images: IProductImage[],
	variants: IProductVariant[],
	options_variant: IProductOption[]
}