import { HeaderContainer } from './styles';
import logoTimer from '../../assets/logo-timer.svg';
import { Link, NavLink } from 'react-router-dom';
import { Scroll, Timer } from 'phosphor-react';

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoTimer} alt="" aria-hidden />
      <nav>
        <NavLink to="/" title="Navigate to timer page">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Navigate to history page">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
