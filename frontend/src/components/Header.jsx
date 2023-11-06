import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
// import LinkContainer from react-router-bootstrap
import logo from '../assets/logo.png'
const Header = () => {
	return (
		<>
			<Navbar
				bg='dark'
				variant='dark'
				expand='md'
				collapseOnSelect
			>
				<Container>
					<Navbar.Brand href='/'>
						<img
							src={logo}
							alt='ProShop'
						/>
						ProShop
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse>
						<Nav className='ms-auto'>
							<Nav.Link href='/cart'>
								<FaShoppingCart /> {''} Cart
							</Nav.Link>
							<Nav.Link href='/login'>
								<FaUser />
								{''} Sign In
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}

export default Header
