import { useState } from 'react';
import Favicon from 'react-favicon';
import favicon from './assets/favicon.svg';

import { Fonts, NavItem, Navbar } from './components';

import { AnimatePresence, motion } from 'framer-motion';
import { BackgroundBeams } from './components/BackgroundBeams/BackgroundBeams';
import { Content2 } from './components/Content2/Content2';

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
    <AnimatePresence>
      <motion.div
        className="relative w-full h-full flex flex-col gap-4 overflow-y-auto"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
      >
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
        <BackgroundBeams />
        <Content2 onShow={id => setActiveNavItem(id)} />
        {/* <Content onShow={id => setActiveNavItem(id)} /> */}
      </motion.div>
    </AnimatePresence>
  );
}
