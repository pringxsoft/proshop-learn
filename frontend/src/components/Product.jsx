import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
	return (
		<Card className='my-3 p-3 rounded'>
			<a href={`/product/${product._id}`}>
				<Card.Img
					src={product.image}
					variant='top'
				></Card.Img>
			</a>
			<Card.Body>
				<a href={`product/${product._id}`}>
					<Card.Title
						as='div'
						className='product-title'
					>
						{product.name}
					</Card.Title>
				</a>
				<Rating
					value={product.rating}
					text={`${product.numReviews} reviews`}
				/>
				<Card.Text as='h3'>${product.price}</Card.Text>
			</Card.Body>
		</Card>
	)
}

export default Product
