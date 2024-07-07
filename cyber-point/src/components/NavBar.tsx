import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = styled.nav`
  background-color: #333;
  padding: 1rem;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  font-size: 1.2rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function NavBar() {
  return (
    <Navbar>
      <NavList>
        <NavItem>
          <NavLink to="/">Página Inicial  </NavLink>
          <NavLink to="/electronics">  Eletrônicos </NavLink>
          <NavLink to="/women">  Women Clothings </NavLink>
          <NavLink to="/jewelery">  Jewelery </NavLink>
          <NavLink to="/mens">  Mens Clothing</NavLink>

        </NavItem>
      </NavList>
    </Navbar>
  );
}

export default NavBar;
