import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { FaTimes } from 'react-icons/fa';

const OrderListScreen = () => {
	const { data: orders, isLoading, error } = useGetOrdersQuery();

	return (
		<>
			<h2>Orders</h2>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table
					striped
					hover
					responsive
					className='table-sm'
				>
					<thead>
						<tr>
							<th>订单编号</th>
							<th>销售员</th>
							<th>创建日期</th>
							<th>总价</th>
							<th>付款</th>
							<th>运送</th>
							<td></td>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user && order.user.name}</td>
								<td>{order.createdAt}</td>
								<td>¥ {order.totalPrice}</td>
								<td>{order.isPaid ? order.paidAt.substring(0, 10) : <FaTimes style={{ color: 'red' }} />}</td>
								<td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <FaTimes style={{ color: 'red' }} />}</td>
								<td>
									<LinkContainer to={`/order/${order._id}`}>
										<Button
											variant='light'
											className='btn-sm'
										>
											订单详情
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default OrderListScreen;
