import styles from '@/styles/nav/Navbar.module.css';

import Image from 'next/image';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar className={styles.nav} disableGutters>
        <Link href='/'>
          <Image
            className={styles.logo}
            src='/balkan-logo.jpg'
            alt='Лого на Балкан АД'
            width={50}
            height={50}
          />
          <Typography variant="h6" component="div">
            Балкан АД - Разбивки
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
