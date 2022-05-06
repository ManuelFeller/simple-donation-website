import * as React from 'react';

import { CardMedia, Container, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { StaticImage } from 'gatsby-plugin-image';

import LayoutModule from '../components/layout';
import PageMetadata from '../components/pageMetadata';
import CampaignListing from '../components/campaignListing';

import PageConfiguration from '../config';
import { graphql } from 'gatsby';

const IndexPage = () => {
  return (
    <LayoutModule>
      <PageMetadata title="Welcome / Willkommen"></PageMetadata>
      &nbsp;
      <Container maxWidth="lg">
        <Card>
          <CardHeader title={PageConfiguration.pageTitle} subheader="How can we help people in Ukraine affected by war?"></CardHeader>
          <CardMedia>
            <StaticImage
              src="../images/ehimetalor-akhere-unuabona-6hzWwYioEo4-unsplash.jpg"
              alt="'We Love Ukraine' Artwork by Ehimetalor Akhere Unuabona (unsplash)"
              placeholder="blurred"
              layout="fullWidth"
              //transformOptions={{ trim: 10 }}
              style={{ height: '430px' }}
            />
          </CardMedia>
        </Card>

        <Typography sx={{ marginBlock: '1em' }}>
          As each day of the war passes, more people in Ukraine are forced to leave their homes and continue to struggle with finding food,
          water, medical supplies, shelter, and covering their basic needs.
        </Typography>
        <Typography sx={{ marginBlock: '1em' }}>
          We are a group of employees who work in Ingelheim, Germany. We have joined our forces since April 2022 to volunteer and actively
          support people in Ukraine affected by the russian invasion. We have friends and family members in Ukraine so we know very well
          what is needed. We collaborate and support volunteers who deliver aid directly to people in need.
        </Typography>

        <Typography variant="h5">You can help people in Ukraine with each donation</Typography>
        <Typography>💙💛</Typography>
        <Typography sx={{ marginBlockEnd: '1em' }}>
          We are asking you to donate to the campaigns we organise, and help the citizens in Ukraine stand against russian attack to protect
          the country they were born and raised in.
        </Typography>

        <Typography variant="h4">Donations in-kind</Typography>

        <Typography sx={{ marginBlock: '1em' }}>
          We regularly update our lists of needs based on information we receive from helpers in Ukraine and the progress of the campaigns.
        </Typography>
        <Typography sx={{ marginBlock: '1em' }}>Currently the most urgent needs for the people within Ukraine:</Typography>

        <CampaignListing />
      </Container>
    </LayoutModule>
  );
};

export default IndexPage;

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
