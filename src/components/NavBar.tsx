import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { NAV_ITEMS } from '../constants';

const NavList = styled.nav`
  color: var(--color-yellow);
  list-style: none;
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: var(--color-dark-bg);
`;

const NavItem = styled.li<{
  $active?: boolean;
}>`
  display: inline;
  cursor: pointer;
  ${({ $active }) => ($active ? 'text-decoration: underline;' : '')}

  &:active {
    color: var(--color-yellow-alpha);
    transform: scale(0.95);
  }
`;

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  return (
    <NavList>
      {NAV_ITEMS.map((item) => (
        <NavItem
          key={item.path}
          $active={location.pathname === item.path}
          onClick={() => navigate(item.path)}
        >
          {item.name}
        </NavItem>
      ))}
      {isAuthenticated ? (
        <NavItem key='logout' $active={false} onClick={logout}>
          logout
        </NavItem>
      ) : (
        <NavItem
          key='login'
          $active={location.pathname === '/login'}
          onClick={() => navigate('/login')}
        >
          login
        </NavItem>
      )}
    </NavList>
  );
};
