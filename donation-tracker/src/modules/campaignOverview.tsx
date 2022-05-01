import * as React from 'react';
import { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { convertDateToString } from '../utils/convertDateToString';
import CampaignCard from '../components/campaignCard';
import { Campaign } from '../types/campaign';
import DataStore from '../utils/dataStore';
import LayoutModule from '../components/layout';
import PageConfiguration from '../config';

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
        <Typography variant="h2" component="h1">
          Campaigns / Sammlungen
        </Typography>
        <Typography component="div">
          🇬🇧 Here you find details about the different campaigns that we have been running so far. You can inform yourself about the ongoing ones as well as the ones that have already finished.
        </Typography>
        &nbsp;
        <Typography component="div">
          🇩🇪 Hier finden Sie Details zu den verschiedenen Sammlungen die wir bisher durchgeführt haben. Sie können sich über laufende und bereits abgeschlossene Sammlungen informieren.
        </Typography>
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
