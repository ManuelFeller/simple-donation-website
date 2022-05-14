import * as React from 'react';

import { graphql } from 'gatsby';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import LayoutModule from '../components/layout';
import PageConfiguration from '../config';
import PageMetadata from '../components/pageMetadata';

const ImprintModule = (props: any) => {
  const { t } = useTranslation();
  // props.pageContext contains the context data from the gatsby-node page generation process
  return (
    <LayoutModule>
      <PageMetadata title={t('imprint.pageTitle')}></PageMetadata>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1"></Typography>
        <Card sx={{ minWidth: 275, marginTop: 3, marginBottom: 3 }}>
          <CardHeader title={t('imprint.pageTitle')} subheader={t('imprint.legalContact')} />
          <CardContent>
            <Typography component="div">{PageConfiguration.ImprintContact.NameOfResponsible}</Typography>
            <Typography component="div">{PageConfiguration.ImprintContact.AddressLine1}</Typography>
            <Typography component="div">{PageConfiguration.ImprintContact.AddressLine2}</Typography>
            <Typography component="div">{PageConfiguration.ImprintContact.ZipCode}</Typography>
            <Typography component="div">{PageConfiguration.ImprintContact.City}</Typography>
            <Typography component="div">{PageConfiguration.ImprintContact.PhoneNumber}</Typography>
            <Typography component="div">{PageConfiguration.ImprintContact.ContactEmail}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275, marginBottom: 3 }}>
          <CardHeader title={t('imprint.cookiePolicy.title')} />
          <CardContent>
            <Typography component="div">
              <Trans i18nKey="imprint.cookiePolicy.content">
                ...<strong>...</strong>...<code>....</code>.....<code>...</code>...
              </Trans>
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275, marginBottom: 3 }}>
          <CardHeader title={t('imprint.dataPrivacy.title')} />
          <CardContent>
            <Typography component="div">
              <Trans i18nKey="imprint.dataPrivacy.content" values={{ email: PageConfiguration.ImprintContact.PrivacyEmail }}>
                ...
                <ul>
                  <li>...</li>
                  <li>...</li>
                  <li>...</li>
                </ul>
                ...
              </Trans>
            </Typography>
          </CardContent>
        </Card>
        {PageConfiguration.ImageContributions.length > 0 && (
          <Card sx={{ minWidth: 275, marginBottom: 3 }}>
            <CardHeader title={t('imprint.imageContributions.title')} />
            <CardContent>
              <Typography component="div">{t('imprint.imageContributions.content')}</Typography>
              <Typography component="div">
                <ul>
                  {PageConfiguration.ImageContributions.map((mention, index) => (
                    <li key={`mention-${index}`}>{mention}</li>
                  ))}
                </ul>
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>
    </LayoutModule>
  );
};

export default ImprintModule;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
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
