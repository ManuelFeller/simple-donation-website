import * as React from 'react';
import LayoutModule from '../components/layout';
import PageMetadata from '../components/pageMetadata';
import { Card, CardContent, CardHeader, Container, Typography } from '@mui/material';
import { graphql } from 'gatsby';

// markup
const NotFoundPage = () => {
  return (
    <LayoutModule>
      <PageMetadata title="Page not found / Seite nicht gefunden"></PageMetadata>
      &nbsp;
      <Container maxWidth="lg">
        <Card sx={{ flex: '0 1 500px', display: 'flex', flexDirection: 'column' }}>
        <CardHeader title="Error 404" subheader="Page not found / Seite nicht gefunden"></CardHeader>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography>            
            We're sorry, but the page you requested is not available.<br/>
            Es tut uns leid, aber die angeforderte Seite ist nicht vorhanden.
          </Typography>
        </CardContent>
        </Card>
      </Container>
      &nbsp;
    </LayoutModule>
  )
}

export default NotFoundPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
