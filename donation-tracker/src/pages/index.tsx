import * as React from 'react';

import { Container, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import { StaticImage } from 'gatsby-plugin-image';

import LayoutModule from '../components/layout';
import PageMetadata from '../components/pageMetadata';
import CampaignListing from '../components/campaignListing';

import PageConfiguration from '../config';

const IndexPage = () => {
  return (
    <LayoutModule>
      <PageMetadata title="Welcome / Willkommen"></PageMetadata>
      &nbsp;
      <Container maxWidth="lg">
        <Card elevation={0} sx={{ margin: '-16px -16px 0 -16px' }}>
          <CardHeader
            title={PageConfiguration.pageTitle}
            subheader="How can we help people in Ukraine? / Wie können wir den Menschen in der Ukraine helfen?"
          ></CardHeader>
          <CardContent sx={{ flex: '1 0 auto', paddingTop: 0 }}>
            <StaticImage
              src="../images/tim-mossholder-BQa--UCtFqg-unsplash_trimmed.jpg"
              alt="Ukraine Flag Artwork by Tim Mossholder (unsplash)"
              placeholder="blurred"
              layout="fullWidth"
              transformOptions={{ trim: 20 }}
              style={{ height: '120px' }}
            />
            <Typography>
              We all know the terrifying things that are happening in Ukraine, many people had to flee the country or move to the western
              part of Ukraine because their houses were bombed, or the food supply was cut down, many lost their jobs. Many people was
              injuried and many have died, and many need help. Therefore we decided to create this space to gather the information about who
              we could help and support people that are still in Ukraine and are fighting for their life. All the needs that we post here we
              have received from our friends in Ukraine who are volunteering and trying to help there. The main focus of this activity is to
              collect humanitarian aid that aims to address different needs. The team behind it is all BI employees and we are just trying
              to help but in our own free time. We will provide all the updates and reports about the collected aid as well as donations, as
              often as we can.
            </Typography>
            &nbsp;
            <Typography component="div">
              <strong>Below you find details about the different local donation campaigns.</strong> You can participate in the ongoing ones
              or inform yourself about the ones that have already finished.
              {PageConfiguration.AutoRefresh && (
                <>
                  &nbsp;<i>The data is refreshed in the background about every {PageConfiguration.MaxDataAgeInMinutes} minutes.</i>
                </>
              )}
            </Typography>
          </CardContent>
        </Card>
        <CampaignListing />
      </Container>
    </LayoutModule>
  );
};

export default IndexPage;
