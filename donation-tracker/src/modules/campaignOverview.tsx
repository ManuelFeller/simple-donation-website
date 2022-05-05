import * as React from 'react';

import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import LayoutModule from '../components/layout';
import PageConfiguration from '../config';
import { StaticImage } from 'gatsby-plugin-image';
import PageMetadata from '../components/pageMetadata';
import CampaignListing from '../components/campaignListing';

const CampaignOverviewModule = () => {
  return (
    <LayoutModule>
      <PageMetadata title="Campaigns / Sammlungen"></PageMetadata>
      <Container maxWidth="lg">
        <Box marginX={-2}>
          <Box m={2}>
            <Card elevation={4}>
              <CardHeader
                title="Campaigns / Sammlungen"
                subheader="How can we help people in Ukraine? / Wie können wir den Menschen in der Ukraine helfen?"
              ></CardHeader>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <StaticImage
                  src="../images/tim-mossholder-BQa--UCtFqg-unsplash_trimmed.jpg"
                  alt="Ukraine Flag Artwork by Tim Mossholder (unsplash)"
                  placeholder="blurred"
                  layout="fullWidth"
                  transformOptions={{ trim: 20 }}
                />
                &nbsp;
                <Typography component="div">
                  🇬🇧 <strong>Here you find details about the different local donation campaigns.</strong> You can participate in the ongoing
                  ones or inform yourself about the ones that have already finished.
                  {PageConfiguration.AutoRefresh && (
                    <>
                      &nbsp;<i>The data is refreshed in the background about every {PageConfiguration.MaxDataAgeInMinutes} minutes.</i>
                    </>
                  )}
                </Typography>
                &nbsp;
                <Typography component="div">
                  🇩🇪 <strong>Hier finden Sie Details zu den verschiedenen lokalen Spenden-Sammlungen.</strong> Sie können sich an laufenden
                  beteiligen und über bereits abgeschlossene informieren.
                  {PageConfiguration.AutoRefresh && (
                    <>
                      &nbsp;<i>Die Daten werden ca. alle {PageConfiguration.MaxDataAgeInMinutes} Minuten im Hintergund aktualisiert.</i>
                    </>
                  )}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
        <CampaignListing />
        &nbsp;
      </Container>
    </LayoutModule>
  );
};

export default CampaignOverviewModule;
