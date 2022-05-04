import * as React from 'react';

import { navigate } from 'gatsby';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import '@fontsource/roboto-slab';

import '../styles.scss';
import { createTheme, ThemeProvider } from '@mui/material/styles';

/* ToDo: import this from a central location */
const mainLevelPages = [
  { name: 'Start', link: '/' },
  { name: 'Campaigns / Sammlungen', link: '/campaigns/' },
  { name: 'Imprint / Impressum', link: '/imprint/' },
];
const titleText = '#StandWithUkraine';

const LayoutModule = (props: any) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleClickOnNavMenu = (event: React.MouseEvent<HTMLElement>, itemLink: string) => {
    // this handles the navigation if JavaScript is active
    event.preventDefault();
    navigate(itemLink);
    setAnchorElNav(null);
  };
  const theme = createTheme({
    typography: {
      fontFamily: '"Roboto Slab","Roboto","Helvetica","Arial",sans-serif',
      overline: {
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        lineHeight: 1.5,
      },
      button: {
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
              {titleText}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {mainLevelPages.map((page, index) => (
                  <MenuItem
                    href={page.link}
                    key={'mMenuItem'.concat(index.toString())}
                    onClick={event => handleClickOnNavMenu(event, page.link)}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              {titleText}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {mainLevelPages.map((page, index) => (
                <Button
                  href={page.link}
                  key={'dMenuItem'.concat(index.toString())}
                  onClick={event => handleClickOnNavMenu(event, page.link)}
                  sx={{ my: 2, color: 'white', display: 'block', fontFamily: theme.typography.fontFamily }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {props.children}
    </ThemeProvider>
  );
};

export default LayoutModule;
