import * as React from 'react';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LayoutModule from '../components/layout';
import PageConfiguration from '../config';
import PageMetadata from '../components/pageMetadata';
import { graphql } from 'gatsby';

const ImprintModule = (props: any) => {
  const {t} = useTranslation();
  // props.pageContext contains the context data from the gatsby-node page generation process
  return(
    <LayoutModule>
      <PageMetadata title={t('imprint.pageTitle')}></PageMetadata>
      &nbsp;
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1"></Typography>
        <Card sx={{ minWidth: 275 }}>
          <CardHeader
            title={t('imprint.pageTitle')}
            subheader={t('imprint.legalContact')}
          />
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
        &nbsp;
        <Card sx={{ minWidth: 275 }}>
          <CardHeader title={t('imprint.cookiePolicy.title')} />
          <CardContent>
            <Typography component="div">
              <Trans i18nKey="imprint.cookiePolicy.content" >
                ...<strong>...</strong>...<code>....</code>.....<code>...</code>...
              </Trans>
            </Typography>
          </CardContent>
        </Card>
        &nbsp;
        <Card sx={{ minWidth: 275 }}>
          <CardHeader title={t('imprint.dataPrivacy.title')} />
          <CardContent>
            <Typography component="div">
              <Trans i18nKey="imprint.dataPrivacy.content" email={PageConfiguration.ImprintContact.PrivacyEmail}>
                ...<ul>
                  <li>...</li>
                  <li>...</li>
                  <li>...</li>
                </ul>...
              </Trans>
            </Typography>
          </CardContent>
        </Card>
        &nbsp;
      </Container>
    </LayoutModule>
  );
}

export default ImprintModule;

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