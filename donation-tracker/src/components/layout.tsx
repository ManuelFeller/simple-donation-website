import * as React from 'react';

import { navigate, graphql } from 'gatsby';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { useLocation } from '@reach/router';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import ShareIcon from '@mui/icons-material/Share';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import '@fontsource/roboto-slab';
import '@fontsource/roboto-slab/800.css';

import '../styles.scss';
import PageConfiguration from '../config';

const titleText = PageConfiguration.pageTitle;

const LayoutModule = (props: any) => {
  const {t} = useTranslation();

  /* ToDo: import this from a central location */
  const mainLevelPages = [
    { name: t('menu.start'), link: '/' },
    { name: t('menu.about'), link: '/about/' },
    { name: t('menu.imprint'), link: '/imprint/' },
  ];

  const generateShareLinks = () => {
    // default to configured Page URL (for SSR in node)
    let shareUrl = PageConfiguration.PageUrl;
    // if runtime (window is defined) override with actual page URL
    if (typeof window !== 'undefined') {
      shareUrl = window.location.href;
    }
    return [
      {
        name: 'Mail',
        link: () => `mailto:?subject=${titleText}&body=Please join us at ${shareUrl} with helping people in Ukraine`,
      },
    ];
  };
  const location = useLocation();
  React.useEffect(() => {
    // make sure we update the share links on navigation changes (without this they stay with the link at load time)
    setShareLinks(generateShareLinks());
  }, [location]);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [shareLinks, setShareLinks] = React.useState<any>(generateShareLinks());
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

  const [anchorElShare, setAnchorElShare] = React.useState<null | HTMLElement>(null);
  const handleOpenShareMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElShare(event.currentTarget);
  };
  const handleCloseShareMenu = () => {
    setAnchorElShare(null);
  };
  const handleClickOnShareMenu = (event: React.MouseEvent<HTMLElement>, itemLink: () => string) => {
    // this handles the navigation if JavaScript is active
    event.preventDefault();
    setAnchorElShare(null);
    window.open(itemLink(), '_blank');
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
    components: {
      MuiCard: {
        defaultProps: {
          elevation: 4,
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ alignItems: { xs: 'center', md: 'baseline' } }}>
            <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
              {titleText}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="app menu"
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
                  <MenuItem href={page.link} key={`mMenuItem${index.toString()}`} onClick={event => handleClickOnNavMenu(event, page.link)}>
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
                  key={`dMenuItem${index.toString()}`}
                  onClick={event => handleClickOnNavMenu(event, page.link)}
                  sx={{ my: 2, color: 'white', display: 'block', fontFamily: theme.typography.fontFamily }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
            <Box>
              <IconButton
                size="large"
                aria-label="share menu"
                aria-controls="menu-share"
                aria-haspopup="true"
                onClick={handleOpenShareMenu}
                color="inherit"
              >
                <ShareIcon />
              </IconButton>
              <Menu
                id="menu-share"
                anchorEl={anchorElShare}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElShare)}
                onClose={handleCloseShareMenu}
              >
                {shareLinks.map((share: any, index: number) => (
                  <MenuItem
                    href={share.link()}
                    key={`shareMenuItem${index.toString()}`}
                    onClick={event => handleClickOnShareMenu(event, share.link)}
                  >
                    <Typography textAlign="center">{share.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {props.children}
    </ThemeProvider>
  );
};

export default LayoutModule;
