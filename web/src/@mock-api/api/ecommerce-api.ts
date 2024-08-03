import _ from '@lodash';
import OlorinUtils from '@olorin/utils';
import mockApi from '../mock-api.json';
import ExtendedMockAdapter, { Params } from '../ExtendedMockAdapter';
import { EcommerceOrder, EcommerceProduct } from '../../app/main/apps/e-commerce/ECommerceApi';

let productsDB = mockApi.components.examples.ecommerce_products.value as EcommerceProduct[];
let ordersDB = mockApi.components.examples.ecommerce_orders.value as EcommerceOrder[];

export const eCommerceApiMocks = (mock: ExtendedMockAdapter) => {
	mock.onGet('/ecommerce/products').reply(() => [200, productsDB]);

	mock.onPost('/ecommerce/products').reply(({ data }) => {
		const newProduct = { id: OlorinUtils.generateGUID(), ...JSON.parse(data as string) } as EcommerceProduct;

		productsDB.unshift(newProduct);

		return [200, newProduct];
	});

	mock.onDelete('/ecommerce/products').reply(({ data }) => {
		const ids = JSON.parse(data as string) as string[];

		productsDB = productsDB.filter((item) => !ids.includes(item.id));

		return [200, productsDB];
	});

	mock.onGet('/ecommerce/products/:id').reply((config) => {
		const { id } = config.params as Params;

		const product = _.find(productsDB, { id });

		if (product) {
			return [200, product];
		}

		return [404, 'Requested product do not exist.'];
	});

	mock.onPut('/ecommerce/products/:id').reply((config) => {
		const { id } = config.params as Params;

		_.assign(_.find(productsDB, { id }), JSON.parse(config.data as string));

		return [200, _.find(productsDB, { id })];
	});

	mock.onDelete('/ecommerce/products/:id').reply((config) => {
		const { id } = config.params as Params;

		_.remove(productsDB, { id });

		return [200, id];
	});

	mock.onGet('/ecommerce/orders').reply(() => [200, ordersDB]);

	mock.onPost('/ecommerce/orders').reply((config) => {
		const newOrder = { id: OlorinUtils.generateGUID(), ...JSON.parse(config.data as string) } as EcommerceOrder;

		ordersDB.push(newOrder);

		return [200, newOrder];
	});

	mock.onDelete('/ecommerce/orders').reply((config) => {
		const ids = JSON.parse(config.data as string) as string[];
		ordersDB = ordersDB.filter((item) => !ids.includes(item.id));

		return [200, ordersDB];
	});

	mock.onGet('/ecommerce/orders/:id').reply((config) => {
		const { id } = config.params as Params;

		const order = _.find(ordersDB, { id });

		if (order) {
			return [200, order];
		}

		return [404, 'Requested order do not exist.'];
	});

	mock.onPut('/ecommerce/orders/:id').reply((config) => {
		const { id } = config.params as Params;

		_.assign(_.find(ordersDB, { id }), JSON.parse(config.data as string) as EcommerceOrder);

		return [200, _.find(ordersDB, { id })];
	});

	mock.onDelete('/ecommerce/orders/:id').reply((config) => {
		const { id } = config.params as Params;

		_.remove(ordersDB, { id });

		return [200, id];
	});
};
