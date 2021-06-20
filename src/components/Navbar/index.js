import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />

		<NavMenu>
		<NavLink to='/create' activeStyle>
			New Toilet
		</NavLink>
		<NavLink to='/list' activeStyle>
			List of Toilet
		</NavLink>
		<NavLink to='/map' activeStyle>
			Toilet Image map
		</NavLink> 
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu> 
		<span style={{fontWeight: "bold", color: "#234123", fontSize: "25px"}}>Toilet Info Hub</span>
	</Nav>
	
	</>
);
};

export default Navbar;
