import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Monogram } from '../';
import {
  TiSocialLinkedinCircular,
  TiSocialGithubCircular,
} from 'react-icons/ti';
import { MdOutlineDownloadForOffline } from 'react-icons/md';

import styles from './Navbar.module.scss';
import image from '../../assets/avatar.png';
import resume from '../../assets/jdnarvaez_resume.pdf';

const spring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
};

export const NavItem = ({ children, idx, isActive, onClick }) => {
  const item = {
    visible: { opacity: 1, transform: 'translate(0%, 0%)' },
    hidden: { opacity: 0, transform: 'translate(110%, 0%)' },
  };

  return (
    <motion.div variants={item}>
      <motion.div
        style={{
          position: 'relative',
          display: 'flex',
          fontWeight: isActive ? '900' : '700',
        }}
        initial={false}
        animate={{ color: isActive ? '#CEFF00' : 'var(--primary-text)' }}
        transition={spring}
      >
        {isActive && (
          <motion.div
            layoutId="outline"
            initial={false}
            transition={spring}
            className={styles.selectorActive}
          >
            <div className={styles.left} />
            <div className={styles.right} />
            <div className={styles.rightTop} />
            <div className={styles.rightBottom} />
            <div className={styles.rightBlock} />
          </motion.div>
        )}
        <div className={styles.navItemContent}>
          <motion.div
            onClick={onClick}
            className={`${styles.inner} text-3xl`}
          >
            {children}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Navbar = ({ children, activeItem }) => {
  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.3,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
      },
    },
  };

  return (
    <motion.div className={styles.navbar}>
      <div style={{ zIndex: 10, padding: '20px 15px 10px 0px' }}>
        <Monogram />
      </div>
      <motion.div
        style={{ height: `100%` }}
        className={styles.navbarInner}
        initial={{
          transform: 'translate(-110%, 0%)',
        }}
        animate={{
          transform: 'translate(0%, 0%)',
        }}
        transition={{ duration: 0.4, when: 'beforeChildren' }}
      />
      <motion.div
        className={styles.navbarList}
        initial="hidden"
        animate="visible"
        variants={list}
      >
        {children}
      </motion.div>

      <motion.div
        initial={{
          transform: 'translate(-110%, 0%)',
        }}
        animate={{
          transform: 'translate(0%, 0%)',
        }}
        style={{
          marginTop: 'auto',
          zIndex: 1,
          color: 'var(--primary-text)',
          fontSize: '50px',
          justifyContent: 'center',
          display: 'flex',
          marginRight: '14px',
          marginBottom: '5px',
          cursor: 'pointer',
        }}
        title="Download Resume"
        onClick={() => open(resume, '_blank')}
      >
        <MdOutlineDownloadForOffline />
      </motion.div>
      <motion.div
        initial={{
          transform: 'translate(-110%, 0%)',
        }}
        animate={{
          transform: 'translate(0%, 0%)',
        }}
        style={{
          zIndex: 1,
          color: 'var(--primary-text)',
          fontSize: '55px',
          justifyContent: 'center',
          display: 'flex',
          marginRight: '12.5px',
          cursor: 'pointer',
        }}
        onClick={() => open('https://github.com/jdnarvaez', '_blank')}
      >
        <TiSocialGithubCircular />
      </motion.div>
      <motion.div
        initial={{
          transform: 'translate(-110%, 0%)',
        }}
        animate={{
          transform: 'translate(0%, 0%)',
        }}
        style={{
          zIndex: 1,
          color: 'var(--primary-text)',
          fontSize: '55px',
          justifyContent: 'center',
          display: 'flex',
          marginRight: '12.5px',
          cursor: 'pointer',
        }}
        onClick={() => open('https://linkedin.com/in/jdnarvaez', '_blank')}
      >
        <TiSocialLinkedinCircular />
      </motion.div>
      <motion.div
        initial={{
          transform: 'translate(-110%, 0%)',
        }}
        animate={{
          transform: 'translate(0%, 0%)',
        }}
        style={{
          zIndex: 1,
          display: 'flex',
          width: '100px',
          height: '100px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '75px',
            height: '75px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid var(--volt)',
            boxSizing: 'border-box',
          }}
        >
          <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={image} />
        </div>
      </motion.div>
    </motion.div>
  );
};
