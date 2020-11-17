import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
  page: 'list' | 'import';
}

interface Activelink {
  list: 'active' | 'inactive';
  import: 'active' | 'inactive';
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  page = 'list',
}: HeaderProps) => {
  const [activeLink] = useState<Activelink>({
    list: page === 'list' ? 'active' : 'inactive',
    import: page === 'import' ? 'active' : 'inactive',
  });

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <Link to="/" className={activeLink.list}>
            Listagem
          </Link>
          <Link to="/import" className={activeLink.import}>
            Importar
          </Link>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
