import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const HomeScreen = () => {
	const { data: products, isLoading, error } = useGetProductsQuery();

	return (
		<>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error?.data?.message || error.error}</Message>
			) : (
				<>
					<h1>Latest Product</h1>
					<Row>
						{products.map((product) => (
							<Col
								sm={12}
								md={6}
								lg={4}
								xl={3}
							>
								<Product
									product={product}
									key={product._id}
								/>
							</Col>
						))}
					</Row>
				</>
			)}
		</>
	);
};

export default HomeScreen;
