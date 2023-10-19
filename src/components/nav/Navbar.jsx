import '../../styles/nav/Navbar.css';

import Image from 'next/image';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Navbar() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar className='nav' disableGutters>
          <a href='/'>
            <Image
              className='logo'
              src='/balkan-logo.jpg'
              alt='Лого на Балкан АД'
              width={50}
              height={50}
            />
            <Typography variant="h6" component="div">
              Балкан АД - Разбивки
            </Typography>
          </a>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
