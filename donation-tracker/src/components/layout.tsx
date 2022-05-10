import * as React from 'react';

import { navigate } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
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
import CssBaseline from '@mui/material/CssBaseline';

export const emailShareLink = () => {
  // default to configured Page URL (for SSR in node)
  let shareUrl = PageConfiguration.PageUrl;
  // if runtime (window is defined) override with actual page URL
  if (typeof window !== 'undefined') {
    shareUrl = window.location.href;
  }
  return `mailto:?subject=${titleText}&body=Please join us at ${shareUrl} with helping people in Ukraine`;
};

const titleText = PageConfiguration.pageTitle;

const LayoutModule = (props: any) => {
  const { t } = useTranslation();

  /* ToDo: import this from a central location */
  const mainLevelPages = [
    { name: t('menu.start'), link: '/' },
    { name: t('menu.about'), link: '/#about-us' },
    { name: t('menu.imprint'), link: '/imprint/' },
  ];

  const generateShareLinks = () => [
    {
      name: 'Mail',
      link: () => emailShareLink(),
    },
  ];

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
    palette: {
      primary: {
        main: '#3F51B5',
      },
      success: {
        main: '#7BC67E',
      },
      background: {
        default: '#fafafa',
      },
    },
    typography: {
      fontFamily: '"Roboto Slab","Roboto","Helvetica","Arial",sans-serif',
      overline: {
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        lineHeight: 1.5,
      },
      button: {
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      },
      h4: {
        marginBlock: '1em .5em',
      },
      h5: {
        marginBlock: '.5em',
      },
      body0: {
        fontSize: '20px',
      },
    },
    components: {
      MuiCard: {
        defaultProps: {
          elevation: 1,
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          title: {
            fontSize: '20px',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar color="default" position="sticky">
        <Container maxWidth="lg">
          <Toolbar color="default" disableGutters sx={{ alignItems: { xs: 'center', md: 'baseline' } }}>
            <Box alignSelf="center" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
              <img width="32" height="32" src={PageConfiguration.pageIconFile} />
            </Box>
            <Button
              key="top"
              href="/"
              color="inherit"
              sx={{ textTransform: 'none', display: { xs: 'none', md: 'flex', mr: 2 } }}
              onClick={event => handleClickOnNavMenu(event, '/')}
            >
              <Typography variant="h6" noWrap component="div">
                {titleText}
              </Typography>
            </Button>
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
                  <MenuItem
                    color="default"
                    href={page.link}
                    key={`mMenuItem${index.toString()}`}
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
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              {mainLevelPages
                .filter((page, index) => index > 0)
                .map((page, index) => (
                  <Button
                    href={page.link}
                    key={`dMenuItem${index.toString()}`}
                    color="inherit"
                    sx={{ my: 2, display: 'block', fontFamily: theme.typography.fontFamily }}
                    onClick={event => handleClickOnNavMenu(event, page.link)}
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
                color="inherit"
                onClick={handleOpenShareMenu}
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

declare module '@mui/material/styles' {
  interface TypographyVariants {
    body0: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body0?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body0: true;
  }
}
