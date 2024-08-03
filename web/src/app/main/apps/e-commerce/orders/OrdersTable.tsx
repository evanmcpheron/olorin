/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import { ListItemIcon, MenuItem, Paper } from '@mui/material';
import * as React from 'react';
import OlorinSvgIcon from '@olorin/core/OlorinSvgIcon';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import OlorinLoading from '@olorin/core/OlorinLoading';
import { EcommerceOrder, useDeleteECommerceOrdersMutation, useGetECommerceOrdersQuery } from '../ECommerceApi';
import OrdersStatus from '../order/OrdersStatus';

function OrdersTable() {
	const { data: orders, isLoading } = useGetECommerceOrdersQuery();
	const [removeOrders] = useDeleteECommerceOrdersMutation();

	const columns = useMemo<MRT_ColumnDef<EcommerceOrder>[]>(
		() => [
			{
				accessorKey: 'id',
				header: 'Id',
				size: 64,
			},
			{
				accessorKey: 'reference',
				header: 'Reference',
				size: 64,
				Cell: ({ row }) => (
					<Typography
						component={Link}
						to={`/apps/e-commerce/orders/${row.original.id}`}
						className="underline"
						color="secondary"
						role="button"
					>
						{row.original.reference}
					</Typography>
				),
			},
			{
				id: 'customer',
				accessorFn: (row) => `${row.customer.firstName} ${row.customer.lastName}`,
				header: 'Customer',
			},
			{
				id: 'total',
				accessorFn: (row) => `$${row.total}`,
				header: 'Total',
				size: 64,
			},
			{ id: 'payment', accessorFn: (row) => row.payment.method, header: 'Payment', size: 128 },
			{
				id: 'status',
				accessorFn: (row) => <OrdersStatus name={row.status[0].name} />,
				accessorKey: 'status',
				header: 'Status',
			},
			{
				accessorKey: 'date',
				header: 'Date',
			},
		],
		[],
	);

	if (isLoading) {
		return <OlorinLoading />;
	}

	return (
		<Paper
			className="flex flex-col flex-auto shadow-3 rounded-t-16 overflow-hidden rounded-b-0 w-full h-full"
			elevation={0}
		>
			<DataTable
				initialState={{
					density: 'spacious',
					showColumnFilters: false,
					showGlobalFilter: true,
					columnPinning: {
						left: ['mrt-row-expand', 'mrt-row-select'],
						right: ['mrt-row-actions'],
					},
					pagination: {
						pageIndex: 0,
						pageSize: 20,
					},
				}}
				data={orders}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<MenuItem
						key={0}
						onClick={() => {
							removeOrders([row.original.id]);
							closeMenu();
							table.resetRowSelection();
						}}
					>
						<ListItemIcon>
							<OlorinSvgIcon>heroicons-outline:trash</OlorinSvgIcon>
						</ListItemIcon>
						Delete
					</MenuItem>,
				]}
				renderTopToolbarCustomActions={({ table }) => {
					const { rowSelection } = table.getState();

					if (Object.keys(rowSelection).length === 0) {
						return null;
					}

					return (
						<Button
							variant="contained"
							size="small"
							onClick={() => {
								const selectedRows = table.getSelectedRowModel().rows;
								removeOrders(selectedRows.map((row) => row.original.id));
								table.resetRowSelection();
							}}
							className="flex shrink min-w-40 ltr:mr-8 rtl:ml-8"
							color="secondary"
						>
							<OlorinSvgIcon size={16}>heroicons-outline:trash</OlorinSvgIcon>
							<span className="hidden sm:flex mx-8">Delete selected items</span>
						</Button>
					);
				}}
			/>
		</Paper>
	);
}

export default OrdersTable;
