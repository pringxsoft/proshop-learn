import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = () => {
	const { pageNumber, keyword } = useParams();

	const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });

	return (
		<>
			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link to='/' className='btn btn-light mb-4'>
					Go Back
				</Link>
			)}
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error?.data?.message || error.error}</Message>
			) : (
				<>
					<h1>Latest Product</h1>
					<Row>
						{data.products.map((product) => (
							<Col sm={12} md={6} lg={4} xl={3}>
								<Product product={product} key={product._id} />
							</Col>
						))}
					</Row>
					<Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
				</>
			)}
		</>
	);
};

export default HomeScreen;
