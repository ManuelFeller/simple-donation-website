import * as React from 'react';
import LayoutModule from '../components/layout';

import { Button, Container, Typography } from '@mui/material';

const IndexPage = () => {
  return <LayoutModule>
    <Container maxWidth="lg">
      &nbsp;
      <Typography variant="h2" component="h1">
        Help Ukraine
      </Typography>
      <Typography component="div">
        Some more details about this page, how things work, ...
      </Typography>
    </Container>
  </LayoutModule>;
};

export default IndexPage;
