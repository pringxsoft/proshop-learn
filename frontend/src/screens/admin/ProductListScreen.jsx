import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Paginate from '../../components/Paginate';

const ProductListScreen = () => {
	const { pageNumber } = useParams();
	const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber });

	const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

	const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

	const createProductHandler = async () => {
		if (window.confirm('你想创建一个新的产品吗？')) {
			try {
				await createProduct();
				refetch();
				toast.success('Product create successed');
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	const deleteHandler = async (id) => {
		if (window.confirm('Are you sure?')) {
			try {
				await deleteProduct(id);
				toast.success('Product delete successed');
				refetch();
			} catch (err) {
				toast.error(err?.data?.message || err.error);
			}
		}
	};

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-end'>
					<Button className='btn-sm m-3' onClick={() => createProductHandler()}>
						<FaEdit /> Create Product
					</Button>
				</Col>
			</Row>
			{loadingCreate && <Loader />}
			{loadingDelete && <Loader />}
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Table striped>
						<thead>
							<tr>
								<th>ID</th>
								<th>名称</th>
								<th>价格</th>
								<th>类别</th>
								<th>品牌</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{data.products.map((product) => (
								<tr>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>${product.price}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>
									<td>
										<LinkContainer to={`/admin/product/${product._id}/edit`}>
											<Button variant='light' className='btn-sm mx-2'>
												<FaEdit />
											</Button>
										</LinkContainer>
										<Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
											<FaTrash style={{ color: 'white' }} />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Paginate pages={data.pages} page={data.page} isAdmin={true} />
				</>
			)}
		</>
	);
};

export default ProductListScreen;
