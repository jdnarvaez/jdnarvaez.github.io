import { useState } from 'react';
import Favicon from 'react-favicon';
import favicon from './assets/favicon.svg';

import {
  FloatingBox,
  Content,
  Navbar,
  Name,
  Disciplines,
  Fonts,
  BackgroundAnimation,
  NavItem,
} from './components';

import styles from './App.module.css';

const items = ['intro', 'experience', 'education'];

export default function App() {
  const [activeNavItem, setActiveNavItem] = useState(items[0]);

  const onShow = (id: string) => {
    document?.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    setActiveNavItem(id);
  };

  return (
    <main className={styles.main}>
      <Fonts />
      <Favicon url={favicon} />
      <Navbar activeItem={activeNavItem}>
        {items.map((item, idx) => (
          <NavItem
            key={idx}
            idx={idx}
            isActive={item === activeNavItem}
            onClick={() => onShow(item)}
          >
            {item}
          </NavItem>
        ))}
      </Navbar>
      <BackgroundAnimation activeNavItem={activeNavItem} />
      <Content onShow={(id) => setActiveNavItem(id)} />
    </main>
  );
}
