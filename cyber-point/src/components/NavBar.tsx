import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = styled.nav`
  background-color: black;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center; /* Centraliza o conteúdo horizontalmente */
  align-items: center;
  position: relative; /* Necessário para posicionar o botão de menu */
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  font-size: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute; /* Posiciona o botão de menu fora do fluxo normal */
  left: 1rem; /* Ajuste a posição conforme necessário */
  
  &:focus {
    outline: none;
  }
`;

function NavBar() {
  return (
    <Navbar>
      <NavContainer>
        <ToggleButton type="button" aria-controls="navbarSupportedContent" aria-expanded="false">
          <span className="navbar-toggler-icon"></span>
        </ToggleButton>
        <NavList id="navbarSupportedContent">
          <NavItem>
            <NavLink to="/">Página Inicial</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/electronics">Eletrônicos</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/women">Women Clothing</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/jewelery">Jewelry</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/mens">Men's Clothing</NavLink>
          </NavItem>
        </NavList>
      </NavContainer>
    </Navbar>
  );
}

export default NavBar;
