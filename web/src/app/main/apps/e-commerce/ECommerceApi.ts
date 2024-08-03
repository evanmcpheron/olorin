import { apiService as api } from 'app/store/apiService';
import { PartialDeep } from 'type-fest';
import ProductModel from './product/models/ProductModel';

export const addTagTypes = ['eCommerce_products', 'eCommerce_product', 'eCommerce_orders', 'eCommerce_order'] as const;

const ECommerceApi = api
	.enhanceEndpoints({
		addTagTypes,
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getECommerceProducts: build.query<GetECommerceProductsApiResponse, GetECommerceProductsApiArg>({
				query: () => ({ url: '/mock-api/ecommerce/products' }),
				providesTags: ['eCommerce_products'],
			}),
			deleteECommerceProducts: build.mutation<DeleteECommerceProductsApiResponse, DeleteECommerceProductsApiArg>({
				query: (productIds) => ({
					url: '/mock-api/ecommerce/products',
					method: 'DELETE',
					data: productIds,
				}),
				invalidatesTags: ['eCommerce_products'],
			}),
			getECommerceProduct: build.query<GetECommerceProductApiResponse, GetECommerceProductApiArg>({
				query: (productId) => ({
					url: `/mock-api/ecommerce/products/${productId}`,
				}),
				providesTags: ['eCommerce_product', 'eCommerce_products'],
			}),
			createECommerceProduct: build.mutation<CreateECommerceProductApiResponse, CreateECommerceProductApiArg>({
				query: (newProduct) => ({
					url: '/mock-api/ecommerce/products',
					method: 'POST',
					data: ProductModel(newProduct),
				}),
				invalidatesTags: ['eCommerce_products', 'eCommerce_product'],
			}),
			updateECommerceProduct: build.mutation<UpdateECommerceProductApiResponse, UpdateECommerceProductApiArg>({
				query: (product) => ({
					url: `/mock-api/ecommerce/products/${product.id}`,
					method: 'PUT',
					data: product,
				}),
				invalidatesTags: ['eCommerce_product', 'eCommerce_products'],
			}),
			deleteECommerceProduct: build.mutation<DeleteECommerceProductApiResponse, DeleteECommerceProductApiArg>({
				query: (productId) => ({
					url: `/mock-api/ecommerce/products/${productId}`,
					method: 'DELETE',
				}),
				invalidatesTags: ['eCommerce_product', 'eCommerce_products'],
			}),
			getECommerceOrders: build.query<GetECommerceOrdersApiResponse, GetECommerceOrdersApiArg>({
				query: () => ({ url: '/mock-api/ecommerce/orders' }),
				providesTags: ['eCommerce_orders'],
			}),
			getECommerceOrder: build.query<GetECommerceOrderApiResponse, GetECommerceOrderApiArg>({
				query: (orderId) => ({ url: `/mock-api/ecommerce/orders/${orderId}` }),
				providesTags: ['eCommerce_order'],
			}),
			updateECommerceOrder: build.mutation<UpdateECommerceOrderApiResponse, UpdateECommerceOrderApiArg>({
				query: (order) => ({
					url: `/mock-api/ecommerce/orders/${order.id}`,
					method: 'PUT',
					data: order,
				}),
				invalidatesTags: ['eCommerce_order', 'eCommerce_orders'],
			}),
			deleteECommerceOrder: build.mutation<DeleteECommerceOrderApiResponse, DeleteECommerceOrderApiArg>({
				query: (orderId) => ({
					url: `/mock-api/ecommerce/orders/${orderId}`,
					method: 'DELETE',
				}),
				invalidatesTags: ['eCommerce_order', 'eCommerce_orders'],
			}),
			deleteECommerceOrders: build.mutation<DeleteECommerceOrdersApiResponse, DeleteECommerceOrdersApiArg>({
				query: (ordersId) => ({
					url: '/mock-api/ecommerce/orders',
					method: 'DELETE',
					data: ordersId,
				}),
				invalidatesTags: ['eCommerce_order', 'eCommerce_orders'],
			}),
		}),
		overrideExisting: false,
	});

export default ECommerceApi;

export type GetECommerceProductsApiResponse = /** status 200 OK */ EcommerceProduct[];
export type GetECommerceProductsApiArg = void;

export type DeleteECommerceProductsApiResponse = unknown;
export type DeleteECommerceProductsApiArg = string[]; /** Product ids */

export type GetECommerceProductApiResponse = /** status 200 OK */ EcommerceProduct;
export type GetECommerceProductApiArg = string;

export type CreateECommerceProductApiResponse = /** status 200 OK */ EcommerceProduct;
export type CreateECommerceProductApiArg = PartialDeep<EcommerceProduct>;

export type UpdateECommerceProductApiResponse = unknown;
export type UpdateECommerceProductApiArg = EcommerceProduct; // Product

export type DeleteECommerceProductApiResponse = unknown;
export type DeleteECommerceProductApiArg = string; // Product id

export type GetECommerceOrdersApiResponse = /** status 200 OK */ EcommerceOrder[];
export type GetECommerceOrdersApiArg = void;

export type GetECommerceOrderApiResponse = /** status 200 OK */ EcommerceOrder;
export type GetECommerceOrderApiArg = string; // Order id

export type UpdateECommerceOrderApiResponse = unknown;
export type UpdateECommerceOrderApiArg = EcommerceOrder; // Order

export type DeleteECommerceOrderApiResponse = unknown;
export type DeleteECommerceOrderApiArg = string; // Order id

export type DeleteECommerceOrdersApiResponse = unknown;
export type DeleteECommerceOrdersApiArg = string[]; // Orders id

export type EcommerceProductImageType = {
	id: string;
	url: string;
	type: string;
};

export type EcommerceProduct = {
	id: string;
	name: string;
	handle: string;
	description: string;
	categories: string[];
	tags: string[];
	featuredImageId: string;
	images: EcommerceProductImageType[];
	priceTaxExcl: number;
	priceTaxIncl: number;
	taxRate: number;
	comparedPrice: number;
	quantity: number;
	sku: string;
	width: string;
	height: string;
	depth: string;
	weight: string;
	extraShippingFee: number;
	active: boolean;
};

export type EcommerceOrder = {
	id: string;
	reference: string;
	subtotal: string;
	tax: string;
	discount: string;
	total: string;
	date: string;
	customer: {
		id: string;
		firstName: string;
		lastName: string;
		avatar: string;
		company: string;
		jobTitle: string;
		email: string;
		phone: string;
		invoiceAddress: {
			address: string;
			lat: number;
			lng: number;
		};
		shippingAddress: {
			address: string;
			lat: number;
			lng: number;
		};
	};
	products: Partial<EcommerceProduct & { image: string; price: string }>[];
	status: {
		id: string;
		name: string;
		color: string;
		date?: string;
	}[];
	payment: {
		transactionId: string;
		amount: string;
		method: string;
		date: string;
	};
	shippingDetails: {
		tracking: string;
		carrier: string;
		weight: string;
		fee: string;
		date: string;
	}[];
};

export const {
	useGetECommerceProductsQuery,
	useDeleteECommerceProductsMutation,
	useGetECommerceProductQuery,
	useUpdateECommerceProductMutation,
	useDeleteECommerceProductMutation,
	useGetECommerceOrdersQuery,
	useGetECommerceOrderQuery,
	useUpdateECommerceOrderMutation,
	useDeleteECommerceOrderMutation,
	useDeleteECommerceOrdersMutation,
	useCreateECommerceProductMutation,
} = ECommerceApi;

export type ECommerceApiType = {
	[ECommerceApi.reducerPath]: ReturnType<typeof ECommerceApi.reducer>;
};
