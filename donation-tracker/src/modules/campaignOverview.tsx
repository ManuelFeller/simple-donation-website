import * as React from 'react';
import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import { convertDateToString } from '../utils/convertDateToString';
import CampaignCard from '../components/campaignCard';
import { Campaign } from '../types/campaign';
import DataStore from '../utils/dataStore';
import LayoutModule from '../components/layout';
import PageConfiguration from '../config';
import { StaticImage } from 'gatsby-plugin-image';

const CampaignOverviewModule = (props: any) => {
  /* --- start of data connection code --- */
  // get the data store object
  let data = DataStore.getInstance();

  // set up a state to have a content re-render trigger
  const [dataUpdateTime, setDataUpdateTime] = useState(new Date(1970, 1, 1));

  // page lifecycle registrations (in the functional component way)
  useEffect(() => {
    // Anything in here is fired on component mount.
    data.subscribeToDataUpdates(handleDataUpdate);
    return () => {
      // Anything in here is fired on component unmount.
      data.unsubscribeFromDataUpdates(handleDataUpdate);
    };
  }, []);

  // the update handler that is passed to the data store object
  const handleDataUpdate = (newUpdateTime: Date) => {
    setDataUpdateTime(newUpdateTime);
  };
  /* --- end of data connection code --- */

  const campaigns = PageConfiguration.CampaignDetails;

  return (
    <LayoutModule>
      <Container maxWidth="lg">
        &nbsp;
        <Card elevation={4} sx={{ flex: '0 1 500px', display: 'flex', flexDirection: 'column' }}>
          <CardHeader
            title="Campaigns / Sammlungen"
            subheader='How can we help people in Ukraine? / Wie können wir den Menschen in der Ukraine helfen?'
          ></CardHeader>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <StaticImage
              src="../images/tim-mossholder-BQa--UCtFqg-unsplash_trimmed.jpg"
              alt="Ukraine Flag Artwork by Tim Mossholder (unsplash)"
              placeholder="blurred"
              layout="fullWidth"
              transformOptions={{trim: 20}}
            />
            &nbsp;
            <Typography component="div">
              🇬🇧 <strong>Here you find details about the different local donation campaigns.</strong> You can participate in the ongoing ones or inform yourself about the ones that have already finished.
            </Typography>
            &nbsp;
            <Typography component="div">
              🇩🇪 <strong>Hier finden Sie Details zu den verschiedenen lokalen Spenden-Sammlungen.</strong> Sie können sich an laufenden beteiligen und über bereits abgeschlossene informieren.
            </Typography>
          </CardContent>
        </Card>
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
          {campaigns.sort(sortByStartDate).map(campaign => (
            <Box m={2} display="flex" flex="0 1 500px" key={campaign.Key}>
              <CampaignCard
                campaign={campaign}
                donationItems={data.getAllItems().filter(({ campaignKey }) => campaignKey === campaign.Key)}
              ></CampaignCard>
            </Box>
          ))}
        </Box>
      </Container>

      <p>
        Data from {convertDateToString(data.getLastDataUpdateTime())}: (last refresh at {convertDateToString(dataUpdateTime)})
      </p>
    </LayoutModule>
  );
};

export default CampaignOverviewModule;

const sortByStartDate = (a: Campaign, b: Campaign) =>
  (a.StartDate?.getTime() ?? 0) < (b.StartDate?.getTime() ?? 0)
    ? 1
    : (a.StartDate?.getTime() ?? 0) > (b.StartDate?.getTime() ?? 0)
    ? -1
    : 0;
