import { HeroUIProvider } from '@heroui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Favicon from 'react-favicon';
import favicon from './assets/favicon.svg';
import { Fonts, NavItem, Navbar } from './components';
import { BackgroundBeams } from './components/BackgroundBeams/BackgroundBeams';
import { Content } from './components/Content/Content';

import "@fontsource/space-mono/700.css";

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
    <HeroUIProvider>
      <AnimatePresence>
        <motion.div
          className="relative w-full h-full flex flex-col gap-4 overflow-hidden"
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
          <Content onShow={id => setActiveNavItem(id)} />
        </motion.div>
      </AnimatePresence>
    </HeroUIProvider>
  );
}
