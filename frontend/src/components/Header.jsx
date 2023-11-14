import React from 'react';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/logo.png';
import { useSelector, useDispatch } from 'react-redux'; // dispatch hook
import { useNavigate } from 'react-router-dom'; // navigate
import { useLogoutMutation } from '../slices/usersApiSlice'; // call logout api
import { logout } from '../slices/authSlice'; // dispatch to logout action

const Header = () => {
	const { cartItems } = useSelector(state => state.cart);
	const { userInfo } = useSelector(state => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [logoutApiCall] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			navigate('/login');
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<Navbar
				bg='dark'
				variant='dark'
				expand='md'
				className='py-0'
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
							<LinkContainer to='/cart'>
								<Nav.Link href='/cart'>
									<FaShoppingCart /> {''} Cart
									{cartItems.length > 0 && (
										<Badge
											pill
											bg='success'
											style={{ marginLeft: '5px' }}
										>
											{cartItems.reduce((a, c) => a + c.qty, 0)}
										</Badge>
									)}
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown
									title={userInfo.name}
									id='username'
								>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login'>
									<Nav.Link href='/login'>
										<FaUser />
										{''} Sign In
									</Nav.Link>
								</LinkContainer>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default Header;
