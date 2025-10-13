import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { UserAuth } from 'src/lib/auth/authContext';
import { pages } from './defintions';
import LogoAndTitle from './LogoAndTitle';

const MobileNavbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { user, logout } = UserAuth();

  const handleLogout = async () => {
    await logout();
  };

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <Toolbar sx={{ display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
 {pages.map((page) => (
   <MenuItem
     key={page.title}
     component={NavLink}
     to={page.path}
     onClick={handleCloseNavMenu}
     sx={{ textDecoration: 'none', color: 'inherit' }}
   >
     <Typography textAlign="center">{page.title}</Typography>
   </MenuItem>
 ))}
        {user && (
          <MenuItem
            onClick={() => {
              handleLogout();
              handleCloseNavMenu();
            }}
          >
            Logout
          </MenuItem>
        )}

 {!user && [
   <MenuItem
     key="signin"
     component={NavLink}
     to="/signin"
     onClick={handleCloseNavMenu}
     sx={{ textDecoration: 'none', color: 'inherit' }}
   >
     <Typography textAlign="center">Sign In</Typography>
   </MenuItem>,
   <MenuItem
     key="signup"
     component={NavLink}
     to="/signup"
     onClick={handleCloseNavMenu}
     sx={{ textDecoration: 'none', color: 'inherit' }}
   >
     <Typography textAlign="center">Join Us</Typography>
   </MenuItem>,
 ]}
      </Menu>
      <LogoAndTitle />
    </Toolbar>
  );
};

export default MobileNavbar;
